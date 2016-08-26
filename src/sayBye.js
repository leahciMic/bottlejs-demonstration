module.exports = function sayByeFactory({ log, keyValueStore }) {
  return function() {
    const name = keyValueStore.get('name');
    log(`See you later ${name || 'mate'}`);
  };
}
