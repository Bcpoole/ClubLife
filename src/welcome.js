export class Welcome {
  logo = '/assets/logo_transparent.png';  
  heading = 'ClubLife';

  constructor() {
    this.setGoals();
  }

  activate() {
    
  }

  setGoals() {
    this.goals = [
      'Cross-platform through the use of Xamarin',
      'User-centered functionality that make it actually worth using',
      'Easy-to-adopt setup for clubs'
    ];
  }
}
