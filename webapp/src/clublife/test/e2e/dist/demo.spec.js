'use strict';

var _welcomePo = require('./welcome.po.js');

var _skeletonPo = require('./skeleton.po.js');

describe('ClubLife', function () {
  var poWelcome = void 0;
  var poSkeleton = void 0;

  beforeEach(function () {
    poSkeleton = new _skeletonPo.PageObjectSkeleton();
    poWelcome = new _welcomePo.PageObjectWelcome();

    browser.loadAndWaitForAureliaPage('http://localhost:9000');
  });

  it('should load the page and display the initial page title', function () {
    expect(poSkeleton.getCurrentPageTitle()).toBe('Welcome | ClubLooife');
  });

  it('should display greeting', function () {
    expect(poWelcome.getGreeting()).toBe('Welcome to ClubLife!');
  });

  it('should navigate to users page', function () {
    poSkeleton.navigateTo('#/users');
    expect(poSkeleton.getCurrentPageTitle()).toBe('Github Users | ClubLife');
  });
});