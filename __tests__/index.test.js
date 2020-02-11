import fs from 'fs';
import genDiff from '../src';

describe('genDiff', () => {
  const getPathToFile1 = (ext) => `${__dirname}/__fixtures__/before.${ext}`;
  const getPathToFile2 = (ext) => `${__dirname}/__fixtures__/after.${ext}`;
  const getResult = (file) => fs.readFileSync(`${__dirname}/__fixtures__/${file}`, 'utf-8');

  const pretty = getResult('pretty');
  const plain = getResult('plain');

  describe('json', () => {
    const before = getPathToFile1('json');
    const after = getPathToFile2('json');

    test('to pretty', () => {
      expect(genDiff(before, after, 'pretty')).toEqual(pretty);
    });

    test('to plain', () => {
      expect(genDiff(before, after, 'plain')).toEqual(plain);
    });
  });

  describe('yaml', () => {
    const before = getPathToFile1('yml');
    const after = getPathToFile2('yml');

    test('to pretty', () => {
      expect(genDiff(before, after, 'pretty')).toEqual(pretty);
    });

    test('to plain', () => {
      expect(genDiff(before, after, 'plain')).toEqual(plain);
    });
  });

  describe('ini', () => {
    const before = getPathToFile1('ini');
    const after = getPathToFile2('ini');

    test('to pretty', () => {
      expect(genDiff(before, after, 'pretty')).toEqual(pretty);
    });

    test('to plain', () => {
      expect(genDiff(before, after, 'plain')).toEqual(plain);
    });
  });
});
