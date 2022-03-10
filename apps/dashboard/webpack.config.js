const withModuleFederation = require('../../tools/mfe/with-module-federation');
const mfeConfig = require('./mfe.config');

module.exports = withModuleFederation({
  ...mfeConfig,
});
