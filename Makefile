.PHONY: format
format:
	npx @biomejs/biome format --write

.PHONY: lint
lint:
	npx @biomejs/biome lint
	npx tsc --noEmit

.PHONY: test
test:
	npx vitest

.PHONY: build
build:
	npx tsc

.PHONY: publish
publish: build
	npm publish
