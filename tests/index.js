const Bottle = require('bottlejs');
const sinon = require('sinon');
const assert = require('assert');
const sayHi = require('../src/sayHi.js');

describe('My Application', function() {
  let di;

  beforeEach(() => {
    di = new Bottle();
    di.factory('sayHi', sayHi);
    di.constant('log', sinon.spy());
    di.constant('keyValueStore', {
      get: sinon.stub(),
      set: sinon.spy()
    });
    di.constant('prompt', sinon.spy(() => Promise.resolve('foobar')));
  });

  describe('persists your name', function() {
    it('should prompt for your name on first visit', function() {
      return di.container.sayHi()
        .then(() => {
          assert(di.container.prompt.calledWith('Hi, I don\'t believe we have met, what is your name? '));
          assert(di.container.keyValueStore.set.calledWith('name', 'foobar'));
          assert(di.container.log.calledWith('Thank you, see you next time foobar'));
        });
    });

    it('should remember your name on second visit', function() {
      di.container.keyValueStore.get.onFirstCall().returns('foobar');
      return di.container.sayHi()
        .then(() => {
          assert(di.container.prompt.called === false);
          assert(di.container.log.calledWith('Hi there foobar, welcome back!'));
        });
    });
  });
});
