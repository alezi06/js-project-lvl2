import _ from 'lodash';
import parse from './parsers';

const getDiff = (before, after) => {
  const keys = _.uniq(Object.keys(before).concat(Object.keys(after)));

  return keys.map((key) => {
    if (_.has(before, key) && _.has(after, key)) {
      if (before[key] instanceof Object && after[key] instanceof Object) {
        return {
          key,
          type: 'node',
          children: getDiff(before[key], after[key]),
        };
      }
      if (before[key] === after[key]) {
        return {
          key,
          type: 'unchanged',
          from: before[key],
          to: after[key],
        };
      }
      return {
        key,
        type: 'changed',
        from: before[key],
        to: after[key],
      };
    }
    if (_.has(before, key)) {
      return {
        key,
        type: 'removed',
        from: before[key],
        to: null,
      };
    }
    return {
      key,
      type: 'added',
      from: null,
      to: after[key],
    };
  });
};

const render = (ast) => {
  const indent = (depth) => '  '.repeat(depth);

  const iter = (items, depth) => {
    const stringify = (value) => {
      if (value instanceof Object) {
        const result = _.map(value, (v, k) => `${k}: ${v}`).join('\n');
        return `{\n${indent(depth + 3)}${result}\n${indent(depth + 1)}}`;
      }
      return value;
    };

    const buildStr = {
      node: (obj) => `${indent(depth)}  ${obj.key}: {\n${iter(obj.children, depth + 2)}\n${indent(depth + 1)}}`,
      added: (obj) => `${indent(depth)}+ ${obj.key}: ${stringify(obj.to)}`,
      removed: (obj) => `${indent(depth)}- ${obj.key}: ${stringify(obj.from)}`,
      changed: (obj) => [
        `${indent(depth)}- ${obj.key}: ${stringify(obj.from)}`,
        `${indent(depth)}+ ${obj.key}: ${stringify(obj.to)}`,
      ],
      unchanged: (obj) => `${indent(depth)}  ${obj.key}: ${stringify(obj.to)}`,
    };

    const result = items.map((item) => buildStr[item.type](item));

    return _.flatten(result).join('\n');
  };

  return `{\n${iter(ast, 1)}\n}`;
};

export default (pathToFile1, pathToFile2) => {
  const diff = getDiff(parse(pathToFile1), parse(pathToFile2));
  return render(diff);
};
