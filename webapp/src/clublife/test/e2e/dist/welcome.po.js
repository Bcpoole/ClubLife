'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageObjectWelcome = exports.PageObjectWelcome = function () {
  function PageObjectWelcome() {
    _classCallCheck(this, PageObjectWelcome);
  }

  PageObjectWelcome.prototype.getGreeting = function getGreeting() {
    return element(by.tagName('h2')).getText();
  };

  return PageObjectWelcome;
}();