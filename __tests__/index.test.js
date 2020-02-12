import fs from 'fs';
import genDiff from '../src';

describe('genDiff', () => {
  const table = [
    ['json', 'pretty'],
    ['json', 'plain'],
    ['json', 'json'],
    ['yml', 'pretty'],
    ['yml', 'plain'],
    ['yml', 'json'],
    ['ini', 'pretty'],
    ['ini', 'plain'],
    ['ini', 'json'],
  ];

  test.each(table)('diff %s to %s format', (ext, format) => {
    const before = `${__dirname}/__fixtures__/before.${ext}`;
    const after = `${__dirname}/__fixtures__/after.${ext}`;
    const result = fs.readFileSync(`${__dirname}/__fixtures__/${format}`, 'utf-8');

    expect(genDiff(before, after, format)).toEqual(result);
  });
});
