package bootstrap

import (
	"database/sql"
	"fmt"
	"log/slog"

	_ "github.com/lib/pq"
)

func newPostgres(log *slog.Logger, psqlConnectionInfo string) (*sql.DB, error) {
	log.Info("Connecting to postgres")
	db, err := sql.Open("postgres", psqlConnectionInfo)
	if err != nil {
		return nil, fmt.Errorf("%v", err)
	}
	return db, nil
}

func MakePostgres(log *slog.Logger, psqlConnectionInfo string) (*sql.DB, error) {
	db, err := newPostgres(log, psqlConnectionInfo)
	if err != nil {
		return nil, fmt.Errorf("%v", err)
	}
	tx, err := db.Begin()
	if err != nil {
		return nil, fmt.Errorf("%v", err)
	}

	_, err = tx.Exec(`
	DROP TABLE IF EXISTS GRSCH;
	DROP TABLE IF EXISTS DGU;
	DROP TABLE IF EXISTS IBP;
	DROP TABLE IF EXISTS SCHR;
	DROP TABLE IF EXISTS PDU;
	DROP TABLE IF EXISTS hot;
	DROP TABLE IF EXISTS cold;
	DROP TABLE IF EXISTS conditioner;
	DROP TABLE IF EXISTS chiller;

	CREATE TABLE IF NOT EXISTS GRSCH (
		record_id SERIAL PRIMARY KEY,
		position INTEGER NOT NULL,
		timestamp TIMESTAMP NOT NULL,
		voltageIn DOUBLE PRECISION NOT NULL,
		voltageOut DOUBLE PRECISION NOT NULL,
		activePower DOUBLE PRECISION NOT NULL,
		coefficient DOUBLE PRECISION NOT NULL
	);

	CREATE TABLE IF NOT EXISTS DGU (
		record_id SERIAL PRIMARY KEY,
		position INTEGER NOT NULL,
		timestamp TIMESTAMP NOT NULL,
		voltageIn DOUBLE PRECISION NOT NULL,
		voltageOut DOUBLE PRECISION NOT NULL,
		activePower DOUBLE PRECISION NOT NULL,
		coefficient DOUBLE PRECISION NOT NULL,
		fuel DOUBLE PRECISION NOT NULL
	);

	CREATE TABLE IF NOT EXISTS IBP (
		record_id SERIAL PRIMARY KEY,
		position INTEGER NOT NULL,
		timestamp TIMESTAMP NOT NULL,
		voltageIn DOUBLE PRECISION NOT NULL,
		voltageOut DOUBLE PRECISION NOT NULL,
		activePower DOUBLE PRECISION NOT NULL,
		coefficient DOUBLE PRECISION NOT NULL,
		charge DOUBLE PRECISION NOT NULL,
		load DOUBLE PRECISION NOT NULL
	);

	CREATE TABLE IF NOT EXISTS SCHR (
		record_id SERIAL PRIMARY KEY,
		position INTEGER NOT NULL,
		timestamp TIMESTAMP NOT NULL,
		voltageIn DOUBLE PRECISION NOT NULL,
		voltageOut DOUBLE PRECISION NOT NULL,
		activePower DOUBLE PRECISION NOT NULL,
		coefficient DOUBLE PRECISION NOT NULL
	);

	CREATE TABLE IF NOT EXISTS PDU (
		record_id SERIAL PRIMARY KEY,
		position INTEGER NOT NULL,
		timestamp TIMESTAMP NOT NULL,
		voltageIn DOUBLE PRECISION NOT NULL,
		voltageOut DOUBLE PRECISION NOT NULL,
		current DOUBLE PRECISION NOT NULL
	);

	CREATE TABLE IF NOT EXISTS hot (
		record_id SERIAL PRIMARY KEY,
		position INTEGER NOT NULL,
		timestamp TIMESTAMP NOT NULL,
		temperature DOUBLE PRECISION NOT NULL,
		humidity DOUBLE PRECISION NOT NULL
	);

	CREATE TABLE IF NOT EXISTS cold (
		record_id SERIAL PRIMARY KEY,
		position INTEGER NOT NULL,
		timestamp TIMESTAMP NOT NULL,
		temperature DOUBLE PRECISION NOT NULL,
		humidity DOUBLE PRECISION NOT NULL
	);

	CREATE TABLE IF NOT EXISTS conditioner (
		record_id SERIAL PRIMARY KEY,
		position INTEGER NOT NULL,
		timestamp TIMESTAMP NOT NULL,
		temperature DOUBLE PRECISION NOT NULL
	);

	CREATE TABLE IF NOT EXISTS chiller (
		record_id SERIAL PRIMARY KEY,
		position INTEGER NOT NULL,
		timestamp TIMESTAMP NOT NULL,
		temperatureIn DOUBLE PRECISION NOT NULL,
		temperatureOut DOUBLE PRECISION NOT NULL
	);
	`)
	if err != nil {
		return nil, fmt.Errorf("%v", err)
	}
	err = tx.Commit()
	if err != nil {
		return nil, fmt.Errorf("%v", err)
	}
	return db, nil
}
