install:
	npm install

run:
	npx babel-node src/bin/gendiff.js

build:
	rm -rf dist
	npm run build

test:
	npm test --watch

publish:
	npm publish --dry-run

lint:
	npx eslint .