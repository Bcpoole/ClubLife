export class App {
  configureRouter(config, router) {
    config.title = 'ClubLife';
    config.map([
      { route: '', name: 'welcome',      moduleId: 'welcome',      nav: false, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title: 'Github Users' }
    ]);

    this.router = router;
  }
}
