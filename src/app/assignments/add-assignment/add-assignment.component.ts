import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  assignmentsCat = [];

  constructor(private assignmentsService:AssignmentsService,
              private router:Router) {}

  ngOnInit(): void {
    this.assignmentsService.getAssignementsCategories().subscribe((assignmentsCat) => {
      this.assignmentsCat = assignmentsCat;
    });
  }

  onSubmit() {
    let nouvelAssignment = new Assignment();
    if(!this.nomAssignment) return;
    if(!this.dateDeRendu) return;
    if(!this.studentAssignment) return;

    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = new Date(this.dateDeRendu);
    nouvelAssignment.student = this.studentAssignment;
    nouvelAssignment.rendu = false;

    //this.assignments.push(nouvelAssignment);
    this.assignmentsService.addAssignment(nouvelAssignment)
    .subscribe((message) => {
      console.log('Assignment ajouté');

      // naviguer programmatiquement vers "/home" pour afficher la liste
      this.router.navigate(["/home"]);
    });
  }

}
