import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Users {
  heading = 'ClubLife Team';
  collaborators = ['bcpoole', 'JonathanMerklin', 'llamallove12', 'GravDragoon'];
  team = [];

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });

    this.http = http;
  }

  activate() {
    for (let i in this.collaborators) {
      this.getUser(this.collaborators[i]);
    }

    this.addDescriptions();
  }

  getUser(username) {
    let userr = null;
    this.http.fetch('users/' + username)
      .then(response => response.json())
      .then(user => {
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
        this.team.push(user);
      });
  }

  addDescriptions() {
    for (user in this.team) {
      console.log("USER");
      console.log(user);
    }
  }
}
