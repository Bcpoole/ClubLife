export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: '', name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' }
    ]);

    this.router = router;
  }
}
