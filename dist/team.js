'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', 'fetch'], function (_export, _context) {
  "use strict";

  var inject, HttpClient, _dec, _class, Users;

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
      _export('Users', Users = (_dec = inject(HttpClient), _dec(_class = function () {
        function Users(http) {
          _classCallCheck(this, Users);

          this.heading = 'ClubLife Team';
          this.collaborators = ['bcpoole', 'JonathanMerklin', 'llamallove12', 'GravDragoon'];
          this.team = [];

          http.configure(function (config) {
            config.useStandardConfiguration().withBaseUrl('https://api.github.com/');
          });

          this.http = http;
        }

        Users.prototype.activate = function activate() {
          for (var i in this.collaborators) {
            this.getUser(this.collaborators[i]);
          }

          this.addDescriptions();
        };

        Users.prototype.getUser = function getUser(username) {
          var _this = this;

          var userr = null;
          this.http.fetch('users/' + username).then(function (response) {
            return response.json();
          }).then(function (user) {
            switch (user.login) {
              case 'Bcpoole':
                user.testProp = 'Hello World';
                break;
              case 'JonathanMerklin':
                user.testProp = 'Hello World 1';
                break;
              case 'llamallove12':
                user.testProp = 'Hello World 2';
                break;
              case 'GravDragoon':
                user.testProp = 'Hello World 3';
                break;
              default:
                break;
            }
            _this.team.push(user);
          });
        };

        Users.prototype.addDescriptions = function addDescriptions() {
          for (user in this.team) {
            console.log("USER");
            console.log(user);
          }
        };

        return Users;
      }()) || _class));

      _export('Users', Users);
    }
  };
});
//# sourceMappingURL=team.js.map
