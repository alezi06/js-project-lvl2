import yaml from 'js-yaml';
import ini from 'ini';

const parser = {
  ini: ini.parse,
  yml: yaml.safeLoad,
  json: JSON.parse,
};

export default (content, type) => parser[type](content);
