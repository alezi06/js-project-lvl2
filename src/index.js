import _ from 'lodash';
import parse from './parsers';

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

export default (pathToFile1, pathToFile2) => (
  getDiff(parse(pathToFile1), parse(pathToFile2))
);
