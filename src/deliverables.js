export class Team {
  heading = 'Deliverables';
  path = 'https://bcpoole.github.io/ClubLife/deliverables/';

  constructor() {
    this.generateFileList();
  }

  generateFileList() {
    this.documentFiles = [
      'P1SoftwareRequirementsDocumentSRD.docx'
    ];

    this.diagramFiles = [
      'CS495ClassDiagramFinal.png',
      'Use Case Diagrams.zip',
      'Activity Diagrams.zip',
      'Class Diagrams.zip',
      'Sequence Diagrams.zip'
    ];

    this.pptxFiles = [
      'Sales Pitch.pptx',
      'PRS-1 Requirements Slides.pptx',
      'PRS-2 Design Slides.pptx',
      'Final Presentation.pptx'
    ];

    this.appFile = 'TO-DO';
  }
}
