module.exports = function sayHi({ keyValueStore, prompt, log }) {
  return function() {
    let name = keyValueStore.get('name');
    return new Promise(resolve => {
      if (!name) {
        prompt('Hi, I don\'t believe we have met, what is your name? ').then(name => {
          keyValueStore.set('name', name);
          log(`Thank you, see you next time ${name}`);
          resolve();
        });
      } else {
        log(`Hi there ${name}, welcome back!`);
        resolve();
      }
    });
  }
};
