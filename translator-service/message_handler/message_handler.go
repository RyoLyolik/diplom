package messagehandler

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log/slog"
	"translator/domain"
	"translator/repository"
)

type messageHandler struct {
	rr  domain.RecordRepository
	log *slog.Logger
}

func NewMessageHandler(log *slog.Logger, db *sql.DB) *messageHandler {
	return &messageHandler{
		rr:  repository.NewRecordRepository(db),
		log: log,
	}
}

func abs(x float64) float64 {
	if x < 0 {
		return -x
	}
	return x
}

func (mh *messageHandler) CheckAlert(ctx context.Context, message []byte) ([]byte, error) {
	var msg domain.IncomingMessage
	if err := json.Unmarshal(message, &msg); err != nil {
		return nil, err
	}
	// titleTemp := "Проблема на %s %d"
	// detailTemp := "Значение %s отклонилось от нормы на %f"
	alert := &domain.Alert{}
	switch msg.RecordType {
	case domain.GRSCH:
	// 	voltageInDiff := msg.Data["voltageIn"] - 400
	// 	if abs(voltageInDiff) > 40 {
	// 		alert.Title = fmt.Sprintf(titleTemp, "ГРЩ", msg.PositionID)
	// 		alert.Detail = fmt.Sprintf(detailTemp, "входного напряжения", voltageInDiff)
	// 	}
	// 	voltageOutDiff := msg.Data["voltageOut"] - 400
	// 	if abs(voltageOutDiff) > 40 {
	// 		alert.Title = fmt.Sprintf(titleTemp, "ГРЩ", msg.PositionID)
	// 		alert.Detail = fmt.Sprintf(detailTemp, "выходного напряжения", voltageOutDiff)
	// 	}
	// case domain.DGU:
	// 	voltageInDiff := msg.Data["voltageIn"] - 400
	// 	if abs(voltageInDiff) > 40 {
	// 		alert.Title = fmt.Sprintf(titleTemp, "ДГУ", msg.PositionID)
	// 		alert.Detail = fmt.Sprintf(detailTemp, "входного напряжения", voltageInDiff)
	// 	}
	// 	voltageOutDiff := msg.Data["voltageOut"] - 400
	// 	if abs(voltageOutDiff) > 40 {
	// 		alert.Title = fmt.Sprintf(titleTemp, "ДГУ", msg.PositionID)
	// 		alert.Detail = fmt.Sprintf(detailTemp, "выходного напряжения", voltageOutDiff)
	// 	}
	// case domain.IBP:
	// 	voltageInDiff := msg.Data["voltageIn"] - 400
	// 	if abs(voltageInDiff) > 40 {
	// 		alert.Title = fmt.Sprintf(titleTemp, "ИБП", msg.PositionID)
	// 		alert.Detail = fmt.Sprintf(detailTemp, "входного напряжения", voltageInDiff)
	// 	}
	// 	voltageOutDiff := msg.Data["voltageOut"] - 400
	// 	if abs(voltageOutDiff) > 40 {
	// 		alert.Title = fmt.Sprintf(titleTemp, "ИБП", msg.PositionID)
	// 		alert.Detail = fmt.Sprintf(detailTemp, "выходного напряжения", voltageOutDiff)
	// 	}
	case domain.SCHR:
	case domain.PDU:
	case domain.Hot:
	case domain.Cold:
	case domain.Сonditioner:
	case domain.Chiller:
	default:
		return nil, fmt.Errorf("failed to define record type %s", msg.RecordType)
	}
	if alert.Title != "" {
		mh.log.Error("ALERT", "alert", alert, "data", msg.Data)
		alertMarshalled, err := json.Marshal(alert)
		if err != nil {
			return nil, err
		}
		return alertMarshalled, nil
	}
	return nil, nil
}

func (mh *messageHandler) HandleMessage(ctx context.Context, message []byte) error {
	var msg domain.IncomingMessage
	if err := json.Unmarshal(message, &msg); err != nil {
		return err
	}
	msg.Timestamp = msg.Timestamp.UTC()
	for i, el := range msg.Data {
		err := mh.rr.Add(ctx, el, msg.Timestamp, i+1, msg.RecordType)
		if err != nil {
			return err
		}
	}
	return nil
}
