import fs from 'fs';
import path from 'path';
import buildAst from './ast';
import parse from './parsers';
import renderToFormat from './formatters';

export default (pathToFile1, pathToFile2, format = 'pretty') => {
  const fileContent1 = fs.readFileSync(pathToFile1, 'utf-8');
  const fileContent2 = fs.readFileSync(pathToFile2, 'utf-8');

  const extension1 = path.extname(pathToFile1).slice(1);
  const extension2 = path.extname(pathToFile2).slice(1);

  const before = parse(fileContent1, extension1);
  const after = parse(fileContent2, extension2);

  const ast = buildAst(before, after);

  return renderToFormat(ast, format);
};
