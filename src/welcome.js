export class Welcome {
  logo = '/assets/logo_transparent.png';  
  heading = 'ClubLife';
  goals = [];

  constructor() {
    this.setGoals();
  }

  activate() {
    
  }

  setGoals() {
    this.goals.push("Major goals include developing the app to be cross-platform through the use of Xamarin, providing user-centered functionality that make it actually worth using, and having an easy-to-adopt setup for clubs.");
  }
}
