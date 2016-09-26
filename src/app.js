export class App {
  configureRouter(config, router) {
    config.title = 'ClubLife';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: false, title: 'Welcome' },
      { route: 'deliverables', name: 'deliverables', moduleId: 'deliverables', nav: true, title: 'Deliverables' },
      { route: 'team',         name: 'team',        moduleId: 'team',        nav: true, title: 'Team' }
    ]);

    this.router = router;
  }
}
