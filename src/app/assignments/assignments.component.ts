import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css','../app.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments : ';
  assignments: Assignment[];
  assignmentsCat;

  // ici injection des services utilisés, en pas oublier "private"
  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit(): void {    
    this.assignmentsService.getAssignments().subscribe((assignments) => {
      this.assignments = assignments;
    });  

    this.assignmentsService.getAssignementsCategories().subscribe((assignmentsCat) => {
      this.assignmentsCat = assignmentsCat;
    });
  }
}
