install:
	npm ci

run:
	npx babel-node src/bin/gendiff.js

build:
	rm -rf dist
	npm run build

test:
	npm test --watch

test-coverage:
	npm test -- --coverage

publish:
	npm publish --dry-run

lint:
	npx eslint .