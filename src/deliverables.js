export class Team {
  heading = 'Deliverables';
  path = 'https://bcpoole.github.io/ClubLife/deliverables/';

  constructor() {
    this.generateFileList();
  }

  generateFileList() {
    this.files = [
      'P1SoftwareRequirementsDocumentSRD.docx',
      'CS495ClassDiagramFinal.png',
      'UseCaseDiagrams.zip',
      'ActivityDiagrams.zip',
      'Sales Pitch.pptx',
      'PRS-1 Requirements Slides.pptx'
    ]
  }
}
