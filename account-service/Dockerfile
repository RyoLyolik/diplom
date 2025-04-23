FROM golang:1.24 AS build
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o ./main ./cmd/main.go

FROM alpine:latest AS runner
COPY local.yaml local.yaml
COPY --from=build /go/main .
CMD ["./main"]
EXPOSE 8080
