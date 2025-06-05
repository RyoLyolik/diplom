import asyncio
import json
import websockets
import logging
from asyncio import sleep as asleep
from generators import grsch_generator, dgu_generator, ibp_generator, schr_generator, pdu_generator, hot_generator, cold_generator, conditioner_generator, chiller_generator
from sensor import Sensor
from websockets.asyncio.connection import Connection


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),  # Вывод в консоль
        logging.FileHandler('websocket_server.log')  # Запись в файл
    ]
)
logger = logging.getLogger(__name__)


sensors = [
    Sensor(grsch_generator(2), 'GRSCH'),
    Sensor(dgu_generator(2), 'DGU'),
    Sensor(ibp_generator(2), 'IBP'),
    Sensor(schr_generator(8), 'SCHR'),
    Sensor(pdu_generator(64), 'PDU'),
    Sensor(hot_generator(4), 'hot'),
    Sensor(cold_generator(32), 'cold'),
    Sensor(conditioner_generator(2), 'conditioner'),
    Sensor(chiller_generator(2), 'chiller'),
]

async def echo(websocket: Connection):
    client_ip = websocket.remote_address[0]
    logger.info(f"Новое подключение от {client_ip}")
    try:
        while True:
            for sensor in sensors:
                await websocket.send(json.dumps(sensor.generate()))
            await asleep(1)

    except websockets.exceptions.ConnectionClosed:
        logger.info(f"Соединение с {client_ip} закрыто")
    except Exception as e:
        logger.error(f"Ошибка с клиентом {client_ip}: {str(e)}")


async def main():
    logger.info("Запуск WebSocket сервера на ws://localhost:2113")
    async with websockets.serve(echo, "0.0.0.0", 2113, server_header={
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    }):
        logger.info("Сервер успешно запущен")
        await asyncio.Future()  # Бесконечное выполнение


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Сервер остановлен по запросу пользователя")
    except Exception as e:
        logger.error(f"Критическая ошибка сервера: {str(e)}")