import fs from 'fs';
import genDiff from '../src';

describe('genDiff', () => {
  const pathToFile1 = (ext) => `${__dirname}/__fixtures__/before.${ext}`;
  const pathToFile2 = (ext) => `${__dirname}/__fixtures__/after.${ext}`;
  const result = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf-8');

  test('json', () => {
    expect(genDiff(pathToFile1('json'), pathToFile2('json'))).toEqual(result);
  });

  test('yaml', () => {
    expect(genDiff(pathToFile1('yml'), pathToFile2('yml'))).toEqual(result);
  });

  test('ini', () => {
    expect(genDiff(pathToFile1('ini'), pathToFile2('ini'))).toEqual(result);
  });
});
