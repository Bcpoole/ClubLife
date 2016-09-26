'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', 'fetch'], function (_export, _context) {
  "use strict";

  var inject, HttpClient, _dec, _class, Team;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_fetch) {}],
    execute: function () {
      _export('Team', Team = (_dec = inject(HttpClient), _dec(_class = function Team() {
        _classCallCheck(this, Team);

        this.heading = 'Deliverables';
      }) || _class));

      _export('Team', Team);
    }
  };
});
//# sourceMappingURL=deliverables.js.map
