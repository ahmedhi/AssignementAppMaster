import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // pour le formulaire
  nomAssignment = '';
  dateDeRendu = '';
  studentAssignment = '';

  constructor(private assignmentsService:AssignmentsService) {}

  ngOnInit(): void {}

  onSubmit() {
    let nouvelAssignment = new Assignment();
    if(!this.nomAssignment) return;
    if(!this.dateDeRendu) return;
    if(!this.studentAssignment) return;

    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = new Date(this.dateDeRendu);
    nouvelAssignment.dateDeRendu = new Date(this.studentAssignment);
    nouvelAssignment.rendu = false;

    //this.assignments.push(nouvelAssignment);
    this.assignmentsService.addAssignment(nouvelAssignment)
    .subscribe((message) => {
      console.log('Assignment ajouté');

      // naviguer programmatiquement vers "/home" pour afficher la liste
    });
  }

}
