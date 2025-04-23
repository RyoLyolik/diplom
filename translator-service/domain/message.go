package domain

import "time"

type RecordType string

const (
	GRSCH       RecordType = "GRSCH"
	DGU         RecordType = "DGU"
	IBP         RecordType = "IBP"
	SCHR        RecordType = "SCHR"
	PDU         RecordType = "PDU"
	Hot         RecordType = "hot"
	Cold        RecordType = "cold"
	Сonditioner RecordType = "conditioner"
	Chiller     RecordType = "chiller"
)

type IncomingMessage struct {
	Timestamp  time.Time            `json:"timestamp"`
	RecordID   float32              `json:"record_id"`
	RecordType RecordType           `json:"type"`
	Data       []map[string]float64 `json:"data"`
	Title      string               `json:"string"`
}

type Alert struct {
	Title  string
	Detail string
}
