'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var Team;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('Team', Team = function () {
        function Team() {
          _classCallCheck(this, Team);

          this.heading = 'Deliverables';
          this.path = 'https://bcpoole.github.io/ClubLife/deliverables/';

          this.generateFileList();
        }

        Team.prototype.generateFileList = function generateFileList() {
          this.documentFiles = ['P1SoftwareRequirementsDocumentSRD.docx'];

          this.diagramFiles = ['CS495ClassDiagramFinal.png', 'Use Case Diagrams.zip', 'Activity Diagrams.zip', 'Class Diagrams.zip', 'Sequence Diagrams.zip'];

          this.pptxFiles = ['Sales Pitch.pptx', 'PRS-1 Requirements Slides.pptx', 'PRS-2 Design Slides.pptx', 'Final Presentation.pptx'];
        };

        return Team;
      }());

      _export('Team', Team);
    }
  };
});
//# sourceMappingURL=deliverables.js.map
