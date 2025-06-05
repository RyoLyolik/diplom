package main

import (
	"account-service/api/route"
	"account-service/bootstrap"
	"account-service/internal/closer"
	"context"
	"flag"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

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
	gin := gin.Default()
	address := fmt.Sprintf("%s:%d", app.Config.HttpServer.Host, app.Config.HttpServer.Port)

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:3030", "http://172.22.0.1:3030"} // move to main config
	corsConfig.AllowCredentials = true
	corsConfig.ExposeHeaders = []string{"Set-Cookie"}
	corsConfig.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"}
	corsConfig.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization", "Set-Cookie"}

	gin.Use(cors.New(corsConfig))

	c.Add(app.Shutdown)

	route.Setup(app, gin)

	log.Info("Starting server")
	go func() {
		gin.Run(address)
	}()
	log.Info("Listening", "address", address)

	<-ctx.Done()
	log.Info("Shutting down application")

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := c.Close(shutdownCtx); err != nil {
		log.Error("error while shutting down application", "err", err)
	}
}
