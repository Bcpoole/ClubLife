import {PageObjectWelcome} from './welcome.po.js';
import {PageObjectSkeleton} from './skeleton.po.js';

describe('ClubLife', function() {
  let poWelcome;
  let poSkeleton;

  beforeEach(() => {
    poSkeleton = new PageObjectSkeleton();
    poWelcome = new PageObjectWelcome();

    browser.loadAndWaitForAureliaPage('http://localhost:9000');
  });

  it('should load the page and display the initial page title', () => {
    expect(poSkeleton.getCurrentPageTitle()).toBe('Welcome | ClubLife');
  });

  it('should display greeting', () => {
    expect(poWelcome.getGreeting()).toBe('Welcome to ClubLife!');
  });

  it('should navigate to users page', () => {
    poSkeleton.navigateTo('#/users');
    expect(poSkeleton.getCurrentPageTitle()).toBe('Team | ClubLife');
  });
});
