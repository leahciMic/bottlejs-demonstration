const Bottle = require('bottlejs');
const sinon = require('sinon');
const assert = require('assert');

const sayHiFactory = require('../src/sayHi.js');
const sayByeFactory = require('../src/sayBye.js');

describe('My Application', function() {
  let di;

  beforeEach(() => {
    di = new Bottle();
    di.factory('sayHi', sayHiFactory);
    di.factory('sayBye', sayByeFactory);
    di.constant('log', sinon.spy());
    di.constant('keyValueStore', {
      get: sinon.stub(),
      set: sinon.spy()
    });
    di.constant('prompt', sinon.spy(() => Promise.resolve('foobar')));
  });

  describe('Salutation', function() {
    it('when name is unknown, should prompt for your name', function() {
      return di.container.sayHi()
        .then(() => {
          assert(di.container.prompt.calledWith('Hi, I don\'t believe we have met, what is your name? '));
          assert(di.container.keyValueStore.set.calledWith('name', 'foobar'));
          assert(di.container.log.calledWith('Thank you, see you next time foobar'));
        });
    });
    it('when name is known, should welcome you bye name', function() {
      di.container.keyValueStore.get.onFirstCall().returns('foobar');
      return di.container.sayHi()
        .then(() => {
          assert(di.container.prompt.called === false);
          assert(di.container.log.calledWith('Hi there foobar, welcome back!'));
        });
    });
  });

  describe('Valediction', function() {
    it('when name is unknown, should say bye with mate', function() {
      di.container.sayBye();
      assert(di.container.log.calledWith('See you later mate'));
    });
    it('when name is known, should say bye with your name', function() {
      di.container.keyValueStore.get.onFirstCall().returns('foobar');
      di.container.sayBye();
      assert(di.container.log.calledWith('See you later foobar'));
    });
  });
});
