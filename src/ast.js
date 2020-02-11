import _ from 'lodash';

const buildAst = (before, after) => {
  const keys = _.uniq(Object.keys(before).concat(Object.keys(after)));

  return keys.map((key) => {
    if (_.has(before, key) && _.has(after, key)) {
      if (before[key] instanceof Object && after[key] instanceof Object) {
        return {
          key,
          type: 'parent',
          children: buildAst(before[key], after[key]),
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

export default buildAst;
