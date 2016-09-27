'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var Welcome;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('Welcome', Welcome = function () {
        function Welcome() {
          _classCallCheck(this, Welcome);

          this.logo = '/assets/logo_transparent.png';
          this.heading = 'ClubLife';

          var localVersion = '/assets/logo_transparent.png';
          var prodVersion = '/ClubLife/assets/logo_transparent.png';
          if (this.UrlExists(localVersion)) {
            this.logo = localVersion;
          } else {
            this.logo = prodVersion;
          }

          this.setGoals();
        }

        Welcome.prototype.setGoals = function setGoals() {
          this.goals = ['Cross-platform through the use of Xamarin', 'User-centered functionality that make it actually worth using', 'Easy-to-adopt setup for clubs'];
        };

        Welcome.prototype.UrlExists = function UrlExists(url) {
          var httpChecker = new XMLHttpRequest();
          httpChecker.open('HEAD', url, false);
          httpChecker.send();
          return httpChecker.status != 404;
        };

        return Welcome;
      }());

      _export('Welcome', Welcome);
    }
  };
});
//# sourceMappingURL=welcome.js.map
