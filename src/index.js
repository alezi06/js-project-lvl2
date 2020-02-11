import buildAst from './ast';
import parse from './parsers';
import renderToFormat from './formatters';

export default (pathToFile1, pathToFile2, format) => {
  const before = parse(pathToFile1);
  const after = parse(pathToFile2);
  const ast = buildAst(before, after);
  return renderToFormat(ast, format);
};
