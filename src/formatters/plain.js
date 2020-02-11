const stringify = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const buildFullPath = (acc, key) => [...acc, key].join('.');

const render = (items, acc) => {
  const buildStr = {
    parent: (node, keys) => render(node.children, [...keys, node.key]),
    added: (node, keys) => `Property '${buildFullPath(keys, node.key)
    }' was added with value: ${stringify(node.to)}`,
    removed: (node, keys) => `Property '${buildFullPath(keys, node.key)}' was deleted`,
    changed: (node, keys) => `Property '${buildFullPath(keys, node.key)
    }' was changed from ${stringify(node.from)} to ${stringify(node.to)}`,
  };

  return items
    .filter((node) => node.type !== 'unchanged')
    .map((node) => buildStr[node.type](node, acc))
    .join('\n');
};

export default (ast) => render(ast, []);
