import { readFileSync } from 'fs';
import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const keys = _.uniq(Object.keys(obj1).concat(Object.keys(obj2)));

  const toStr = (obj, key, d) => `  ${d} ${key}: ${obj[key]}`;

  const result = keys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return [...acc, toStr(obj2, key, ' ')];
      }
      return [...acc, toStr(obj2, key, '+'), toStr(obj1, key, '-')];
    }
    if (_.has(obj1, key)) {
      return [...acc, toStr(obj1, key, '-')];
    }
    return [...acc, toStr(obj2, key, '+')];
  }, []);

  return `{\n${result.join('\n')}\n}`;
};

export default (pathToFile1, pathToFile2) => {
  const fileContent1 = readFileSync(pathToFile1);
  const fileContent2 = readFileSync(pathToFile2);
  const obj1 = JSON.parse(fileContent1);
  const obj2 = JSON.parse(fileContent2);
  return getDiff(obj1, obj2);
};
