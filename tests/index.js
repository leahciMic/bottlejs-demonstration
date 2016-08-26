const sinon = require('sinon');
const assert = require('assert');
const sayHiFactory = require('../src/sayHi.js');
const sayByeFactory = require('../src/sayBye');

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
    sayBye = sayByeFactory(injected);
  });

  describe('Salutation', function() {
    it('when name is unknown, should prompt for your name', function() {
      return sayHi()
        .then(() => {
          assert(injected.prompt.calledWith('Hi, I don\'t believe we have met, what is your name? '));
          assert(injected.keyValueStore.set.calledWith('name', 'foobar'));
          assert(injected.log.calledWith('Thank you, see you next time foobar'));
        });
    });

    it('when name is known, should welcome you bye name', function() {
      injected.keyValueStore.get.onFirstCall().returns('foobar');
      return sayHi()
        .then(() => {
          assert(injected.prompt.called === false);
          assert(injected.log.calledWith('Hi there foobar, welcome back!'));
        });
    });
  });

  describe('Valediction', function() {
    it('when name is unknown, should say bye with mate', function() {
      sayBye();
      assert(injected.log.calledWith('See you later mate'));
    });
    it('when name is known, should say bye with your name', function() {
      injected.keyValueStore.get.onFirstCall().returns('foobar');
      sayBye();
      assert(injected.log.calledWith('See you later foobar'));
    });
  });
});
