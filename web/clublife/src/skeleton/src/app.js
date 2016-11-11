export class App {
  configureRouter(config, router) {
    config.title = 'ClubLife';
    config.map([
      { route: '', name: 'welcome',      moduleId: 'welcome',      nav: false, title: 'Welcome' }
    ]);

    this.router = router;
  }
}
