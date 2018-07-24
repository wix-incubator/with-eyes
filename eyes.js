const path = require('path');
const uuid = require('uuid');
const {Eyes} = require('eyes.images');

const {
  EYES_API_KEY,
  EYES_BATCH_UUID
} = process.env;

const eyes = {
  DEFAULT_TIMEOUT: parseInt(process.env.WITH_EYES_TIMEOUT, 10) || 30000,
  checkImage: () => {},
  // eslint-disable-next-line object-shorthand, no-unused-vars
  openEyes: function (fn, test, options) {
    return fn.call(this);
  }
};

if (EYES_API_KEY) {
  const {name} = require(path.join(process.cwd(), 'package.json'));
  const instance = new Eyes();

  instance.setOs(process.platform);
  instance.setApiKey(EYES_API_KEY);
  instance.setBatch(name, EYES_BATCH_UUID || uuid.v4());

  eyes.checkImage = instance.checkImage.bind(instance);

  eyes.openEyes = async function (fn, test, options) {
    const version = (options || {}).version || '1.0.0';
    try {
      await instance.open(name, `${test}, ${version}`);
      await fn.call(this);
    } catch (error) {
      await instance.abortIfNotClosed();
      throw error;
    }
    await instance.close();
  };

}

module.exports = eyes;
