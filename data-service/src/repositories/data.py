
from datetime import datetime, timedelta

from schemes.data import DataResponse, FoundData

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession


class DataRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_filter(self, tablename: str, position: int) -> DataResponse:
        query = f'''
SELECT * FROM {tablename}
WHERE position={position}
ORDER BY timestamp DESC
LIMIT 300;
        '''
        result = await self.session.execute(text(query))
        rows = result.all()[::-1]
        result = {'times': [], 'data': {}}
        for row in rows:
            result['times'].append(row[2] + timedelta(hours=3))
        match tablename.lower():
            case 'chiller':
                result['data'] = {
                    'Температура на входе': {
                        'uof': '°C',
                        'values': [],
                    },
                    'Температура на выходе': {
                        'uof': '°C',
                        'values': [],
                    }
                }
                for row in rows:
                    result['data']['Температура на входе']['values'].append(row[3])
                    result['data']['Температура на выходе']['values'].append(row[4])
            case 'cold':
                result['data'] = {
                    'Температура': {
                        'uof': '°C',
                        'values': [],
                    },
                    'Влажность': {
                        'uof': '',
                        'values': [],
                    }
                }
                for row in rows:
                    result['data']['Температура']['values'].append(row[3])
                    result['data']['Влажность']['values'].append(row[4])
            case 'hot':
                result['data'] = {
                    'Температура': {
                        'uof': '°C',
                        'values': [],
                    },
                    'Влажность': {
                        'uof': '',
                        'values': [],
                    }
                }
                for row in rows:
                    result['data']['Температура']['values'].append(row[3])
                    result['data']['Влажность']['values'].append(row[4])
            case 'conditioner':
                result['data'] = {
                    'Температура': {
                        'uof': '°C',
                        'values': [],
                    },
                }
                for row in rows:
                    result['data']['Температура']['values'].append(row[3])
            case 'dgu':
                result['data'] = {
                    'Напряжение': {
                        'uof': 'В',
                        'values': [],
                    },
                    'Активная мощность': {
                        'uof': 'кВт',
                        'values': [],
                    },
                    'Коэффициент мощности': {
                        'uof': '',
                        'values': [],
                    },
                    'Уровень топлива': {
                        'uof': '',
                        'values': [],
                    }
                }
                for row in rows:
                    result['data']['Напряжение']['values'].append(row[3])
                    result['data']['Активная мощность']['values'].append(row[4])
                    result['data']['Коэффициент мощности']['values'].append(row[5])
                    result['data']['Уровень топлива']['values'].append(row[6])
            case 'grsch':
                result['data'] = {
                    'Напряжение': {
                        'uof': 'В',
                        'values': [],
                    },
                    'Активная мощность': {
                        'uof': 'кВт',
                        'values': [],
                    },
                    'Коэффициент мощности': {
                        'uof': '',
                        'values': [],
                    },
                }
                for row in rows:
                    result['data']['Напряжение']['values'].append(row[3])
                    result['data']['Активная мощность']['values'].append(row[4])
                    result['data']['Коэффициент мощности']['values'].append(row[5])
            case 'ibp':
                result['data'] = {
                    'Напряжение': {
                        'uof': 'В',
                        'values': [],
                    },
                    'Активная мощность': {
                        'uof': 'кВт',
                        'values': [],
                    },
                    'Коэффициент мощности': {
                        'uof': '',
                        'values': [],
                    },
                    'Уровень заряда': {
                        'uof': '',
                        'values': [],
                    },
                    'Нагрузка': {
                        'uof': '',
                        'values': [],
                    }
                }
                for row in rows:
                    result['data']['Напряжение']['values'].append(row[3])
                    result['data']['Активная мощность']['values'].append(row[4])
                    result['data']['Коэффициент мощности']['values'].append(row[5])
                    result['data']['Уровень заряда']['values'].append(row[6])
                    result['data']['Нагрузка']['values'].append(row[7])
            case 'pdu':
                result['data'] = {
                    'Напряжение': {
                        'uof': 'В',
                        'values': [],
                    },
                    'Сила тока': {
                        'uof': 'кВт',
                        'values': [],
                    },
                }
                for row in rows:
                    result['data']['Напряжение']['values'].append(row[3])
                    result['data']['Сила тока']['values'].append(row[4])
            case 'schr':
                result['data'] = {
                    'Напряжение': {
                        'uof': 'В',
                        'values': [],
                    },
                    'Активная мощность': {
                        'uof': 'кВт',
                        'values': [],
                    },
                    'Коэффициент мощности': {
                        'uof': '',
                        'values': [],
                    },
                }
                for row in rows:
                    result['data']['Напряжение']['values'].append(row[3])
                    result['data']['Активная мощность']['values'].append(row[4])
                    result['data']['Коэффициент мощности']['values'].append(row[5])
        return DataResponse.model_validate(result)

    async def get_min_max_grouped(
        self,
        tablename,
        parameter,
        grouping,
        timefrom,
        timeto,
        position,
        target
    ) -> list[FoundData]:
        query = f'''
WITH deviations AS (
    SELECT
        timestamp,
        position,
        {parameter},
        ABS({parameter} - {target}) AS deviation,  -- Вычисляем отклонение от target
        DATE_TRUNC('{grouping}', timestamp) AS hour_start
    FROM
        {tablename}
    WHERE
        position={position} AND
        timestamp BETWEEN '{timefrom}' AND '{timeto}'
),
max_deviations AS (
    SELECT
        hour_start,
        position,
        MAX(deviation) AS max_deviation
    FROM
        deviations
    GROUP BY
        hour_start,
        position
)
SELECT
    d.timestamp AS peak_time,
    d.hour_start,
    d.position,
    d.{parameter},
    d.deviation
FROM
    deviations d
JOIN
    max_deviations md
    ON d.hour_start = md.hour_start
    AND d.position = md.position
    AND d.deviation = md.max_deviation
ORDER BY
    d.hour_start,
    d.position;
'''
        result = await self.session.execute(text(query))
        rows = result.all()
        ans = []
        for row in rows:
            fdata = FoundData.model_construct(
                timestamp=row[0],
                position=row[2],
                value=row[3],
            )
            ans.append(fdata)
        return ans
