import _ from 'lodash';

const indent = (depth) => '  '.repeat(depth);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const result = _.map(value, (v, k) => `${k}: ${v}`).join('\n');
  return `{\n${indent(depth + 3)}${result}\n${indent(depth + 1)}}`;
};

const render = (items, depth = 1) => {
  const buildStr = {
    parent: (obj) => `${indent(depth)}  ${obj.key}: {\n${
      render(obj.children, depth + 2)}\n${indent(depth + 1)}}`,
    added: (obj) => `${indent(depth)}+ ${obj.key}: ${stringify(obj.to, depth)}`,
    removed: (obj) => `${indent(depth)}- ${obj.key}: ${stringify(obj.from, depth)}`,
    changed: (obj) => [
      `${indent(depth)}- ${obj.key}: ${stringify(obj.from, depth)}`,
      `${indent(depth)}+ ${obj.key}: ${stringify(obj.to, depth)}`,
    ],
    unchanged: (obj) => `${indent(depth)}  ${obj.key}: ${stringify(obj.to, depth)}`,
  };

  const result = items.map((item) => buildStr[item.type](item));

  return _.flatten(result).join('\n');
};

export default (ast) => `{\n${render(ast)}\n}`;
