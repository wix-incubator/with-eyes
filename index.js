module.exports = require('./mocha');

if (global.test) {
  module.exports = require('./jest');
} else if (global.fit) {
  module.exports = require('./jasmine');
}
