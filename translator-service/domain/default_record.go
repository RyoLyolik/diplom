package domain

import "time"

type DefaultRecord struct {
	Timestamp time.Time
	Position  int
}

type GRSCHData struct {
	VoltageIn  float64
	VoltageOut float64
	Active     float64
	K          float64
}

type DGUData struct {
	VoltageIn  float64
	VoltageOut float64
	Active     float64
	K          float64
	Fuel       float64
}

type IBPData struct {
	VoltageIn  float64
	VoltageOut float64
	Active     float64
	K          float64
	Charge     float64
	Load       float64
}

type SCHRData struct {
	VoltageIn  float64
	VoltageOut float64
	Active     float64
	K          float64
}

type PDUData struct {
	VoltageIn  float64
	VoltageOut float64
	Current    float64
}

type HotData struct {
	Temperature float64
	Humidity    float64
}

type ColdData struct {
	Temperature float64
	Humidity    float64
}

type ConditionerData struct {
	TemperatureOut float64
}

type ChillerData struct {
	TemperatureIn  float64
	TemperatureOut float64
}
