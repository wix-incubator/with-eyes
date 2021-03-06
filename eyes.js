const path = require('path');
const uuid = require('uuid');
const {Eyes} = require('@applitools/eyes-images');

const {
  EYES_API_KEY,
  EYES_BATCH_UUID,
  EYES_PLATFORM,
  EYES_API_SERVER_URL,
  WITH_EYES_TIMEOUT
} = process.env;

const eyes = {
  DEFAULT_TIMEOUT: parseInt(WITH_EYES_TIMEOUT, 10) || 30000,
  checkImage: async () => false,
  // eslint-disable-next-line no-unused-vars
  setMatchTimeout: timeout => false,
  // eslint-disable-next-line object-shorthand, no-unused-vars
  openEyes: function (fn, test, options) {
    return fn.call(this);
  },
  abortIfNotClosed: async () => Promise.resolve()
};

let addBaselineName = false;
let fixedViewPort = true;

function useFixedViewPort(value) {
  fixedViewPort = !!value;
}

function useBaselineName(value) {
  addBaselineName = !!value;
}

if (EYES_API_KEY) {
  const {name} = require(path.join(process.cwd(), 'package.json'));
  const instance = new Eyes();

  if (EYES_PLATFORM || process.platform) {
    instance.setHostOS(EYES_PLATFORM || process.platform);
  }
  instance.setApiKey(EYES_API_KEY);
  instance.setBatch(name, EYES_BATCH_UUID || uuid.v4());

  if (EYES_API_SERVER_URL) {
    instance.setServerUrl(EYES_API_SERVER_URL);
  }

  eyes.checkImage = instance.checkImage.bind(instance);
  eyes.setMatchTimeout = instance.setMatchTimeout.bind(instance);
  eyes.abortIfNotClosed = instance.abortIfNotClosed.bind(instance);

  eyes.openEyes = async function (fn, test, options) {
    if (addBaselineName) {
      instance.setBaselineEnvName(test);
    }
    const version = (options || {}).version || '1.0.0';
    const throwOnFail = options ? options.throwOnFail : true;
    try {
      const viewport = fixedViewPort ? {width: 100, height: 100} : undefined;
      await instance.open(name, `${test}, ${version}`, viewport);
      await fn.call(this);
    } catch (error) {
      await instance.abortIfNotClosed();
      throw error;
    }
    await instance.close(throwOnFail);
  };

}

module.exports.eyes = eyes;
module.exports.useBaselineName = useBaselineName;
module.exports.useFixedViewPort = useFixedViewPort;
