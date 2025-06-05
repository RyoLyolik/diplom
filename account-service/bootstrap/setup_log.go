package bootstrap

import (
	"context"
	"fmt"
	"log/slog"
	"os"
)

type CustomHandler struct {
	component string
	handler   slog.Handler
}

func (h *CustomHandler) Enabled(ctx context.Context, level slog.Level) bool {
	return h.handler.Enabled(ctx, level)
}

func (h *CustomHandler) Handle(ctx context.Context, record slog.Record) error {
	message := fmt.Sprintf("[%s] %s", h.component, record.Message)

	var attrs []string
	record.Attrs(func(attr slog.Attr) bool {
		attrs = append(attrs, fmt.Sprintf("%s=%v", attr.Key, attr.Value.String()))
		return true
	})

	logLine := fmt.Sprintf(
		"%s %s | %s",
		message,
		record.Time.Format("2006/01/02 - 15:04:05"),
		record.Level,
	)

	if len(attrs) > 0 {
		logLine += " | " + fmt.Sprintf("%s", attrs)
	}

	return h.handler.Handle(ctx, slog.Record{
		Time:    record.Time,
		Level:   record.Level,
		Message: logLine,
	})
}

func (h *CustomHandler) WithAttrs(attrs []slog.Attr) slog.Handler {
	return &CustomHandler{
		component: h.component,
		handler:   h.handler.WithAttrs(attrs),
	}
}

func (h *CustomHandler) WithGroup(name string) slog.Handler {
	return &CustomHandler{
		component: h.component,
		handler:   h.handler.WithGroup(name),
	}
}

func SetupLogger(logCfg *LoggerConfig) *slog.Logger {
	var log *slog.Logger
	var level slog.Level
	customHandler := &CustomHandler{component: "APP"}

	switch logCfg.Level {
	case "debug":
		level = slog.LevelDebug
	case "info":
		level = slog.LevelInfo
	default:
		fmt.Println("Unknown log level")
		os.Exit(1)
	}

	switch logCfg.Handler {
	case "text":
		customHandler.handler = slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{Level: level})
	case "json":
		customHandler.handler = slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: level})
	default:
		fmt.Println("Unknown log handler")
		os.Exit(1)
	}
	log = slog.New(customHandler.handler) // todo delete ".handler" and setup custom handler properly
	return log
}
