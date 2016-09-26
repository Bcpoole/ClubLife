export class PageObjectWelcome {

  constructor() {

  }

  getGreeting() {
    return element(by.tagName('h2')).getText();
  }
}
