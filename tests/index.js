const sinon = require('sinon');
const assert = require('assert');
const sayHiFactory = require('../src/sayHi.js');

describe('My Application', function() {
  let sayHi, injected;
  beforeEach(() => {
    injected = {
      log: sinon.spy(),
      keyValueStore: {
        get: sinon.stub(),
        set: sinon.spy()
      },
      prompt: sinon.spy(() => Promise.resolve('foobar')),
    };
    sayHi = sayHiFactory(injected);
  });

  describe('persists your name', function() {
    it('should prompt for your name on first visit', function() {
      return sayHi()
        .then(() => {
          assert(injected.prompt.calledWith('Hi, I don\'t believe we have met, what is your name? '));
          assert(injected.keyValueStore.set.calledWith('name', 'foobar'));
          assert(injected.log.calledWith('Thank you, see you next time foobar'));
        });
    });

    it('should remember your name on second visit', function() {
      injected.keyValueStore.get.onFirstCall().returns('foobar');
      return sayHi()
        .then(() => {
          assert(injected.prompt.called === false);
          assert(injected.log.calledWith('Hi there foobar, welcome back!'));
        });
    });
  });
});
