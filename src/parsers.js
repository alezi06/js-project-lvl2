import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parser = {
  '.ini': (data) => ini.parse(data),
  '.yml': (data) => yaml.safeLoad(data),
  '.json': (data) => JSON.parse(data),
};

export default (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8');
  const extension = path.extname(filepath);
  return parser[extension](content);
};
