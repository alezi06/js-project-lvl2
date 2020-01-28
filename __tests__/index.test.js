import { readFileSync } from 'fs';
import genDiff from '../src';

test('genDiff', () => {
  const path1 = `${__dirname}/__fixtures__/before.json`;
  const path2 = `${__dirname}/__fixtures__/after.json`;
  const result = readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf-8');

  expect(genDiff(path1, path2)).toMatch(result);
});
