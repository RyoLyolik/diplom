# Подготовка
Разработка велась под линукс, на Windows лучше скачать WSL:
https://learn.microsoft.com/ru-ru/windows/wsl/install

Или использовать ВМ (виртуальную машину)

После чего можно внутри WSL/ВМ запускать систему
# Запуск
> далее предполагается разработка на линуксе

Для запуска требуется наличие утилит docker, docker-compose, make на системе

Команлдка запуска бэкенда:
```
make dev
```
Для формированного перезапуска контейнеров можно написать (но обычно команды выше хватает для перезапуска)
```
make dev-recreate
```

Команда запуска фронтенда:
```
cd frontend
pnpm start
```
# Работа в системе
После запуска интерфейс системы будет доступен по адресу http://localhost:3030/auth/register

# Немного о структуре:
* `account-service` - сервис на Go по работе: [[1](account-service/README.md)]
* `data-service` - сервис на Python для генерации отчетов и работе с ицнидентами [[2](data-service/README.md)]
* `producer` - программа для иммитации микроконтроллера, которые собирает данные с оборудования [[3](producer/README.md)]
* `translator-service` - сервис по сбору и передачи данных с `producer` [[4](translator-service/README.md)]
* `dependencies` - внешние зависимости [[4](dependencies/README.md)]
