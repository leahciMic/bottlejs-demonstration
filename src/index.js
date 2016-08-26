const STATE_STORE_FILE_URL = './state-store.json';

const log = console.log.bind(console);
const prompt = require('./prompt.js')();
const keyValueStore = require('./dumb-state-store.js')({ STATE_STORE_FILE_URL });
const sayHi = require('./sayHi.js');
const sayBye = require('./sayBye.js');

sayHi({ keyValueStore, log, prompt })()
  .then(function() {
    sayBye({ keyValueStore, log })();
  });
