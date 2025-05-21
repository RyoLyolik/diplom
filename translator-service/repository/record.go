package repository

import (
	"context"
	"database/sql"
	"fmt"
	"time"
	"translator/domain"
)

type recordRepository struct {
	database *sql.DB
}

func NewRecordRepository(db *sql.DB) domain.RecordRepository {
	return &recordRepository{
		database: db,
	}
}

func (pr *recordRepository) Add(ctx context.Context, record map[string]float64, timestamp time.Time, position int, type_ domain.RecordType) error {
	tx, err := pr.database.Begin()
	if err != nil {
		return fmt.Errorf("failed to start transaction: %v", err)
	}
	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()
	switch type_ {
	case domain.GRSCH:
		stmt := `
		INSERT INTO GRSCH (position, timestamp, voltage, activePower, coefficient) VALUES ($1, $2, $3, $4, $5)
		`
		_, err = tx.Exec(stmt, position, timestamp, record["voltage"], record["activePower"], record["coefficient"])
	case domain.DGU:
		stmt := `
		INSERT INTO DGU (position, timestamp, voltage, activePower, coefficient, fuel) VALUES ($1, $2, $3, $4, $5, $6)
		`
		_, err = tx.Exec(stmt, position, timestamp, record["voltage"], record["activePower"], record["coefficient"], record["fuel"])
	case domain.IBP:
		stmt := `
		INSERT INTO IBP (position, timestamp, voltage, activePower, coefficient, charge, load) VALUES ($1, $2, $3, $4, $5, $6, $7)
		`
		_, err = tx.Exec(stmt, position, timestamp, record["voltage"], record["activePower"], record["coefficient"], record["charge"], record["load"])
	case domain.SCHR:
		stmt := `
		INSERT INTO SCHR (position, timestamp, voltage, activePower, coefficient) VALUES ($1, $2, $3, $4, $5)
		`
		_, err = tx.Exec(stmt, position, timestamp, record["voltage"], record["activePower"], record["coefficient"])
	case domain.PDU:
		stmt := `
		INSERT INTO PDU (position, timestamp, voltage, current) VALUES ($1, $2, $3, $4)
		`
		_, err = tx.Exec(stmt, position, timestamp, record["voltage"], record["current"])
	case domain.Hot:
		stmt := `
		INSERT INTO hot (position, timestamp, temperature, humidity) VALUES ($1, $2, $3, $4)
		`
		_, err = tx.Exec(stmt, position, timestamp, record["temperature"], record["humidity"])
	case domain.Cold:
		stmt := `
		INSERT INTO cold (position, timestamp, temperature, humidity) VALUES ($1, $2, $3, $4)
		`
		_, err = tx.Exec(stmt, position, timestamp, record["temperature"], record["humidity"])
	case domain.Сonditioner:
		stmt := `
		INSERT INTO conditioner (position, timestamp, temperature) VALUES ($1, $2, $3)
		`
		_, err = tx.Exec(stmt, position, timestamp, record["temperature"])
	case domain.Chiller:
		stmt := `
		INSERT INTO chiller (position, timestamp, temperatureIn, temperatureOut) VALUES ($1, $2, $3, $4)
		`
		_, err = tx.Exec(stmt, position, timestamp, record["temperatureIn"], record["temperatureOut"])
	default:
		err = fmt.Errorf("cannot define record %s", type_)
	}
	if err != nil {
		return fmt.Errorf("failed to insert pressure record: %v", err)
	}
	err = tx.Commit()
	if err != nil {
		return fmt.Errorf("failed to commit pressure insertion: %v", err)
	}
	return nil
}
