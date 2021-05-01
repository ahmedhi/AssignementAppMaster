import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments : ';
  assignments: Assignment[];

  // ici injection des services utilisés, en pas oublier "private"
  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit(): void {
    // appelée avant affichage du composant
    console.log(
      'Composant assignments, dans le ngOnInit, on demande aux service le tableau des assignments'
    );
    this.assignmentsService.getAssignments().subscribe((assignments) => {
      console.log('Dans le subscribe...');
      this.assignments = assignments;
    });
  }
}
