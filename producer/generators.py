from datetime import datetime, timezone
from typing import Generator
from value_generator import value_generator


ANOMALY_CHANGE = 0.001


def grsch_generator(amount: int) -> Generator[dict, None, None]:
    voltage_in_generator = setup_generator([400])
    active_generator = setup_generator([700])
    coefficient_generator = setup_generator([0.97])
    while True:
        data = []
        for pos_id in range(amount):
            temp = {}
            temp['voltage'] = next(voltage_in_generator)
            temp['activePower'] = next(active_generator)
            temp['coefficient'] = next(coefficient_generator)
            data.append(temp)
        yield data

def dgu_generator(amount: int) -> Generator[dict, None, None]:
    voltage_in_generator = setup_generator([400])
    active_generator = setup_generator([700])
    coefficient_generator = setup_generator([0.97])
    fuel_generator = setup_generator([0.8])
    while True:
        data = []
        for pos_id in range(amount):
            temp = {}
            temp['voltage'] = next(voltage_in_generator)
            temp['activePower'] = next(active_generator)
            temp['coefficient'] = next(coefficient_generator)
            temp['fuel'] = next(fuel_generator)
            data.append(temp)
        yield data

def ibp_generator(amount: int) -> Generator[dict, None, None]:
    voltage_in_generator = setup_generator([400])
    active_generator = setup_generator([700])
    coefficient_generator = setup_generator([0.97])
    charge_generator = setup_generator([0.95])
    load_generator = setup_generator([0.5])
    while True:
        data = []
        for pos_id in range(amount):
            temp = {}
            temp['voltage'] = next(voltage_in_generator)
            temp['activePower'] = next(active_generator)
            temp['coefficient'] = next(coefficient_generator)
            temp['charge'] = next(charge_generator)
            temp['load'] = next(load_generator)
            data.append(temp)
        yield data

def schr_generator(amount: int) -> Generator[dict, None, None]:
    voltage_in_generator = setup_generator([400])
    active_generator = setup_generator([700])
    coefficient_generator = setup_generator([0.97])
    while True:
        data = []
        for pos_id in range(amount):
            temp = {}
            temp['voltage'] = next(voltage_in_generator)
            temp['activePower'] = next(active_generator)
            temp['coefficient'] = next(coefficient_generator)
            data.append(temp)
        yield data


def pdu_generator(amount: int) -> Generator[dict, None, None]:
    voltage_in_generator = setup_generator([230])
    current_generator = setup_generator([16])
    while True:
        data = []
        for pos_id in range(amount):
            temp = {}
            temp['voltage'] = next(voltage_in_generator)
            temp['current'] = next(current_generator)
            data.append(temp)
        yield data

def hot_generator(amount: int) -> Generator[dict, None, None]:
    temperature_generator = setup_generator([30])
    humidity_generator = setup_generator([50])
    while True:
        data = []
        for pos_id in range(amount):
            temp = {}
            temp['temperature'] = next(temperature_generator)
            temp['humidity'] = next(humidity_generator)
            data.append(temp)
        yield data

def cold_generator(amount: int) -> Generator[dict, None, None]:
    temperature_generator = setup_generator([22])
    humidity_generator = setup_generator([50])
    while True:
        data = []
        for pos_id in range(amount):
            temp = {}
            temp['temperature'] = next(temperature_generator)
            temp['humidity'] = next(humidity_generator)
            data.append(temp)
        yield data

def conditioner_generator(amount: int) -> Generator[dict, None, None]:
    temperature_generator = setup_generator([20])
    while True:
        data = []
        for pos_id in range(amount):
            temp = {}
            temp['temperature'] = next(temperature_generator)
            data.append(temp)
        yield data

def chiller_generator(amount: int) -> Generator[dict, None, None]:
    temperature_in_generator = setup_generator([22])
    temperature_out_generator = setup_generator([16])
    while True:
        data = []
        for pos_id in range(amount):
            temp = {}
            temp['temperatureIn'] = next(temperature_in_generator)
            temp['temperatureOut'] = next(temperature_out_generator)
            data.append(temp)
        yield data

def temperature_generator() -> Generator[dict, None, None]:
    set_points = [
        50, 60, 75, 100, # 4
        125, 160, 200, 250, # 8
        310, 400, 490, 570, # 12
        630, 690, 740, 770, # 16
        795, 815, 840, 855, # 20
        870, 890, 910, 925, # 24
        930, 940, 937, 930, # 28
        915, 910, 890, 875, # 32
        860, 845, 830, 800, # 36
        760, 730, 650, 425, # 40
        300, 225, 150, 120, # 44
        80, 60 # 46
    ]
    generator = setup_generator(set_points)
    for position, record in generator:
        yield process_data(record, 'temperature', position)


def pressure_generator() -> Generator[dict, None, None]:
    set_points = [
        36, 37, 38, 39, # 4
        39, 38, 36.8, 35, # 8
        34, 31, 26, 24, # 12
        22, 18, 14, 13, # 16
        11, 10, 9, 8.7, # 20
        8.5, 8.4, 8.3, 8.2, # 24
        8.1, 8, 8, 8, # 28
        8, 8, 8, 8, # 32
        7.95, 7.9, 7.85, 7.7, # 36
        7.4, 7, 6.6, 6.2, # 40
        5.8, 5.8, 5.8, 5.8, # 44
        5.8, 5.8, # 46
    ]
    generator = setup_generator(set_points)
    for position, record in generator:
        yield process_data(record, 'pressure', position)


def flap_generator() -> Generator[dict, None, None]:
    set_points = [50]*10
    generator = setup_generator(set_points)
    for position, record in generator:
        yield process_data(record, 'flap', position)


def setup_generator(setpoints: list[float]) -> Generator[tuple[int, int], None, None]:
    generators = [
        value_generator(
            set_point=sp,
            noise_level=sp/500,
            anomaly_chance=ANOMALY_CHANGE,
            anomaly_size=sp/5,
        )
        for sp in setpoints
    ]
    while True:
        for i, generator in enumerate(generators):
            yield next(generator)


def process_data(value: float, type: str, position: int) -> dict:
    tmstmp = datetime.now(tz=timezone.utc)
    return {
        'timestamp': tmstmp.isoformat(),
        'record_id': tmstmp.timestamp(),
        'record_type': type,
        'value': value,
        'pos_id': position
    }
