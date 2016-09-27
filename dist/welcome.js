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
          this.goals = [];

          this.setGoals();
        }

        Welcome.prototype.activate = function activate() {};

        Welcome.prototype.setGoals = function setGoals() {
          this.goals.push("Major goals include developing the app to be cross-platform through the use of Xamarin, providing user-centered functionality that make it actually worth using, and having an easy-to-adopt setup for clubs.");
        };

        return Welcome;
      }());

      _export('Welcome', Welcome);
    }
  };
});
//# sourceMappingURL=welcome.js.map
