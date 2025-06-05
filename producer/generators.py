from typing import Generator
from value_generator import value_generator


ANOMALY_CHANGE = 0.01


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
