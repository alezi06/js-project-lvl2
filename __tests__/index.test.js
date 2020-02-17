import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

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
    const before = `${getFixturePath('before')}.${ext}`;
    const after = `${getFixturePath('after')}.${ext}`;
    const result = fs.readFileSync(getFixturePath(format), 'utf-8');

    expect(genDiff(before, after, format)).toEqual(result);
  });
});
