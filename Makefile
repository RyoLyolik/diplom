SHELL:=/bin/bash
# может помочь при создании тестов
ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

# Запуск в dev окружении
# немного некрасиво сделано, ждем 5 секунд, пока запустятся все контейнеры до конца, чтобы не мигали ошибки
dev:
	docker compose --env-file .env.dev -p dev --file dependencies/docker-compose.yml up --build -d
	sleep 5
	docker compose --env-file .env.dev -p dev --file docker-compose.yml up --build -d

dev-recreate:
	docker compose --env-file .env.dev -p dev --file dependencies/docker-compose.yml up --build -d --force-recreate
	sleep 5
	docker compose --env-file .env.dev -p dev --file docker-compose.yml up --build -d --force-recreate
