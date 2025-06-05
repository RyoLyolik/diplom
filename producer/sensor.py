from datetime import datetime, timedelta, timezone
from typing import Generator


class Sensor:
    def __init__(self, generator: Generator[dict, None, None], type_: str):
        self.generator = generator
        self.data = {
            'type': type_,
        }

    def generate(self):
        dt = datetime.now(tz=timezone(offset=timedelta(hours=3)))
        self.data['timestamp'] = dt.isoformat()
        self.data['record_id'] = dt.timestamp()
        self.data['data'] = next(self.generator)
        return self.data
