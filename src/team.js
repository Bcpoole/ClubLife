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
  }

  getUser(username) {
    return this.http.fetch('users/' + username)
      .then(response => response.json())
      .then(user => this.team.push(user));
  }
}
