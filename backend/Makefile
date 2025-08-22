APP = main
GO = go

all:
	@echo "🧪 Запускаем тесты..."
	@$(GO) test -v ./internal/test/api/users/...
	@echo "✅ Тесты прошли! Запускаем приложение..."
	@$(GO) run ./cmd/app/main.go

test: 
	$(GO) test ./internal/test/api/users

run:
	$(GO) run ./cmd/app/main.go
