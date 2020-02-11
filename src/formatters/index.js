import renderToPlain from './plain';
import renderToPretty from './pretty';

const formatter = {
  plain: renderToPlain,
  pretty: renderToPretty,
};

export default (ast, type) => formatter[type](ast);
