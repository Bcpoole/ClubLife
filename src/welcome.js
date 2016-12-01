export class Welcome {
  heading = 'ClubLife';

  constructor() {
    let localVersion = '/assets/logo_transparent.png';
    let prodVersion = '/ClubLife/assets/logo_transparent.png';
    if (this.UrlExists(localVersion)) {
      this.logo = localVersion;
    } else {
      this.logo = prodVersion;
    }
  }

  UrlExists(url) {
      let httpChecker = new XMLHttpRequest();
      httpChecker.open('HEAD', url, false);
      httpChecker.send();
      return httpChecker.status != 404;
  }
}
