const Bottle = require('bottlejs');
const di = new Bottle();

di.constant('STATE_STORE_FILE_URL', './state-store.json');
di.constant('log', console.log.bind(console));
di.service('prompt', require('./prompt.js'));
di.factory('keyValueStore', require('./dumb-state-store.js'));
di.factory('sayHi', require('./sayHi.js'));
di.factory('sayBye', require('./sayBye.js'));

di.container.sayHi().then(function() {
  di.container.sayBye();
});
