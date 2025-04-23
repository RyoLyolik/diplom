package domain

import (
	"context"
	"time"
)

type RecordRepository interface {
	Add(ctx context.Context, record map[string]float64, timestamp time.Time, position int, type_ RecordType) error
}
