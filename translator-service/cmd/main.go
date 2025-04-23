package main

import (
	"context"
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"

	"translator/bootstrap"
	"translator/internal/closer"
	messagehandler "translator/message_handler"

	"github.com/gorilla/websocket"
)

// Upgrader для WebSocket соединений
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Разрешаем все источники (можно настроить более строго)
	},
}

func main() {
	envFile := flag.String("env-file", "", "Path to environment file")
	flag.Parse()
	app, err := bootstrap.App(envFile)
	if err != nil {
		fmt.Printf("error configuring app %v", err)
		os.Exit(1)
	}

	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()
	runApp(ctx, &app)
}

func runApp(ctx context.Context, app *bootstrap.Application) {
	c := &closer.Closer{}
	log := app.Log
	c.Add(app.Shutdown)

	msgChan := make(chan []byte, 1000)
	alertChan := make(chan []byte, 1000)

	type client struct {
		conn  *websocket.Conn
		send  chan []byte
		alert chan []byte
	}
	var (
		clients   = make(map[*client]bool)
		clientsMu sync.Mutex
	)

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		log.Info("New connection!!!!!!!!!!!")
		if err != nil {
			log.Error("failed to upgrade to WebSocket", "err", err)
			return
		}
		defer conn.Close()

		client := &client{
			conn: conn,
			send: make(chan []byte, 256),
		}

		clientsMu.Lock()
		clients[client] = true
		clientsMu.Unlock()

		defer func() {
			clientsMu.Lock()
			delete(clients, client)
			clientsMu.Unlock()
		}()

		for {
			select {
			case message, ok := <-client.send:
				if !ok {
					return
				}
				if err := conn.WriteMessage(websocket.TextMessage, message); err != nil {
					log.Error("failed to send message to client", "err", err)
					return
				}
			case <-ctx.Done():
				return
			}
		}
	})
	http.HandleFunc("/ws/alert", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Error("failed to upgrade to WebSocket", "err", err)
			return
		}
		defer conn.Close()

		client := &client{
			conn:  conn,
			alert: make(chan []byte, 256),
		}

		clientsMu.Lock()
		clients[client] = true
		clientsMu.Unlock()

		defer func() {
			clientsMu.Lock()
			delete(clients, client)
			clientsMu.Unlock()
		}()

		for {
			select {
			case message, ok := <-client.alert:
				if !ok {
					return
				}
				if err := conn.WriteMessage(websocket.TextMessage, message); err != nil {
					log.Error("failed to send message to client", "err", err)
					return
				}
			case <-ctx.Done():
				return
			}
		}
	})

	go func() {
		mh := messagehandler.NewMessageHandler(log.WithGroup("MessageHandler"), app.Postgre)
		for {
			_, message, err := app.WSClient.ReadMessage()
			if err != nil {
				log.Error("read error, trying to reconnect", "err", err)
				if err := app.WSReconnect(ctx); err != nil {
					log.Error("failed to reconnect", "err", err)
				}
				continue
			}
			msgChan <- message
			// alert, err := mh.CheckAlert(ctx, message)
			// if err != nil {
			// 	log.Error("failed to handle message", "err", err)
			// }
			// if alert != nil {
			// 	alertChan <- alert
			// }

			err = mh.HandleMessage(ctx, message)
			if err != nil {
				log.Error("failed to handle message", "err", err)
			}
		}
	}()

	go func() {
		for {
			select {
			case message := <-msgChan:
				clientsMu.Lock()
				for client := range clients {
					if client.send != nil {
						select {
						case client.send <- message:
						default:
							// Если канал переполнен, удаляем клиента
							close(client.send)
							delete(clients, client)
						}
					}
				}
				clientsMu.Unlock()
				// time.Sleep(time.Millisecond * 200)
			case <-ctx.Done():
				return
			}
		}
	}()
	go func() {
		for {
			select {
			case alert := <-alertChan:
				clientsMu.Lock()
				for client := range clients {
					if client.alert != nil {
						select {
						case client.alert <- alert:
						default:
							// Если канал переполнен, удаляем клиента
							close(client.alert)
							delete(clients, client)
						}
					}
				}
				clientsMu.Unlock()
				// time.Sleep(time.Millisecond * 200)
			case <-ctx.Done():
				return
			}
		}
	}()

	server := &http.Server{Addr: ":2114"}
	go func() {
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Error("failed to start WebSocket server", "err", err)
		}
	}()
	<-ctx.Done()

	log.Info("Shutting down application")

	close(msgChan)

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Остановка HTTP сервера
	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Error("error while shutting down HTTP server", "err", err)
	}

	if err := c.Close(shutdownCtx); err != nil {
		log.Error("error while shutting down application", "err", err)
	}
}
