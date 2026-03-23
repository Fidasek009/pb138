SHELL := /bin/sh
.DEFAULT_GOAL := help

# Configuration
COMPOSE := docker compose
HELM_RELEASE := pagepal
HELM_CHART := ./helm
API_IMAGE := ghcr.io/fidasek009/pagepal-api
WEB_IMAGE := ghcr.io/fidasek009/pagepal-web
VITE_API_URL ?= http://localhost:3000

# Branch-based environment detection
BRANCH := $(shell git branch --show-current)
ifeq ($(BRANCH),main)
  ENV := prod
  NAMESPACE := pagepal-prod
  HELM_VALUES :=
else
  ENV := dev
  NAMESPACE := pagepal-dev
  HELM_VALUES := -f $(HELM_CHART)/values.dev.yaml
endif

.PHONY: help
help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ── Local Development ──────────────────────────────
.PHONY: setup
setup: ## Install deps and start database
	bun install
	$(COMPOSE) up -d db --wait
	@echo "Setup complete. Run 'make dev' to start development."

.PHONY: dev
dev: db-up ## Start local development (DB + apps)
	bun run dev

.PHONY: dev-api
dev-api: db-up ## Start API only (with DB)
	bun run dev:api

.PHONY: dev-web
dev-web: ## Start web only
	bun run dev:web

.PHONY: db-up
db-up: ## Start PostgreSQL
	$(COMPOSE) up -d db

.PHONY: db-down
db-down: ## Stop database services
	$(COMPOSE) down

.PHONY: db-reset
db-reset: ## Reset database (destroy volume and recreate)
	$(COMPOSE) down -v
	$(COMPOSE) up -d db

# TODO: enable once packages/db implements Drizzle (package.json + schema + migrations)
.PHONY: db-migrate
db-migrate: ## Run Drizzle migrations
	cd packages/db && bun run drizzle-kit migrate

.PHONY: db-seed
db-seed: ## Seed the database
	cd packages/db && bun run seed

.PHONY: db-studio
db-studio: ## Open Drizzle Studio
	cd packages/db && bun run drizzle-kit studio

# ── Build ──────────────────────────────────────────
.PHONY: build
build: ## Build all workspaces
	bun run build

.PHONY: docker-build-api
docker-build-api: ## Build API Docker image
	docker build -f apps/api/Dockerfile -t "$(API_IMAGE):$(ENV)" .

.PHONY: docker-build-web
docker-build-web: ## Build Web Docker image
	docker build -f apps/web/Dockerfile \
		--build-arg VITE_API_URL="$(VITE_API_URL)" \
		-t "$(WEB_IMAGE):$(ENV)" .

.PHONY: docker-build
docker-build: docker-build-api docker-build-web ## Build all Docker images

# ── Test / Lint ────────────────────────────────────
.PHONY: test
test: ## Run all tests
	bun run test

.PHONY: lint
lint: ## Lint all workspaces
	bun run check

# ── Helm ───────────────────────────────────────────
.PHONY: helm-deps
helm-deps: ## Update Helm chart dependencies
	helm dependency update "$(HELM_CHART)"

.PHONY: helm-lint
helm-lint: ## Lint Helm chart
	helm lint "$(HELM_CHART)"

.PHONY: deploy
deploy: helm-deps ## Deploy to cluster (env based on git branch)
	@echo "Deploying to $(NAMESPACE) (branch: $(BRANCH), env: $(ENV))"
	helm upgrade --install "$(HELM_RELEASE)" "$(HELM_CHART)" \
		-n "$(NAMESPACE)" --create-namespace \
		$(HELM_VALUES)

.PHONY: undeploy
undeploy: ## Uninstall from cluster (env based on git branch)
	@echo "Removing from $(NAMESPACE) (branch: $(BRANCH), env: $(ENV))"
	helm uninstall "$(HELM_RELEASE)" -n "$(NAMESPACE)"
