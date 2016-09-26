'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var App;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('App', App = function () {
        function App() {
          _classCallCheck(this, App);
        }

        App.prototype.configureRouter = function configureRouter(config, router) {
          config.title = 'ClubLife';
          config.map([{ route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: false, title: 'Welcome' }, { route: 'deliverables', name: 'deliverables', moduleId: 'deliverables', nav: true, title: 'Deliverables' }, { route: 'team', name: 'team', moduleId: 'team', nav: true, title: 'Team' }]);

          this.router = router;
        };

        return App;
      }());

      _export('App', App);
    }
  };
});
//# sourceMappingURL=app.js.map
