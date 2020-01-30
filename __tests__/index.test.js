import { readFileSync } from 'fs';
import genDiff from '../src';

const result = readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf-8');

test('JSON', () => {
  const path1 = `${__dirname}/__fixtures__/before.json`;
  const path2 = `${__dirname}/__fixtures__/after.json`;

  expect(genDiff(path1, path2)).toMatch(result);
});

test('YML', () => {
  const path1 = `${__dirname}/__fixtures__/before.yml`;
  const path2 = `${__dirname}/__fixtures__/after.yml`;

  expect(genDiff(path1, path2)).toMatch(result);
});
