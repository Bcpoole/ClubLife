export class Team {
  heading = 'Deliverables';
  path = 'https://bcpoole.github.io/ClubLife/deliverables/';

  constructor() {
    this.generateFileList();
  }

  generateFileList() {
    this.files = [
      'P1SoftwareRequirementsDocumentSRD.docx'
    ]
  }
}
