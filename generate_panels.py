import json
from uuid import uuid4
from copy import deepcopy

with open('./pansels.json') as f:
    panels: dict = json.load(f)

panel = deepcopy(panels[0])

new_panels = []

voltage_in_panel = deepcopy(panel)
def build_panel(panel, title, path, k):
    panel = deepcopy(panel)
    panel['gridPos']['y'] = 100*k
    panel['id'] = (k+1)
    panel['transformations'][0]['options']['jsonPaths'] = [{'alias': 'type', 'path': 'type'}]
    panel['transformations'][2]['options']['conversions'] = []
    for i in range(32):
        panel['title'] = title

        alias = f'{i+1}'

        panel['transformations'][0]['options']['jsonPaths'].append({
            'alias':alias,
            'path': f'data[{i}].{path}'
        })

        panel['transformations'][1]['options']['filters'][0]['config']['options']['value'] = 'PDU'

        panel['transformations'][2]['options']['conversions'].append({
            'destinationType': 'number',
            'targetField': alias,
        })
    return panel


new_panels.append(
    build_panel(panel, 'Температура на стойках, °C', 'temperature', 0)
)

new_panels.append(
    build_panel(panel, 'Влажность на стойках', 'humidity', 1)
)


# print(new_panels[0])
# print()
# print()
# print(new_panels[1])

with open('PDU-1745414434773.json') as f:
    db = json.load(f)

db['panels'] = new_panels

with open('./PDU-1745414434773.json', mode='w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False)

