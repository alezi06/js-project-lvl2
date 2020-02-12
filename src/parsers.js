import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parser = {
  ini: ini.parse,
  yml: yaml.safeLoad,
  json: JSON.parse,
};

export default (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8');
  const extension = path.extname(filepath).slice(1);
  return parser[extension](content);
};
