import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { map, pairwise, tap, filter, throttleTime } from 'rxjs/operators';
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

  ngOnInit(): void {
    // appelée AVANT affichage du composant
    
    
    this.assignmentsService.getAssignments().subscribe((assignments) => {
      this.assignments = assignments;
    });

    this.assignmentsService.getAssignementsCategories().subscribe((assignmentsCat) => {
      this.assignmentsCat = assignmentsCat;
    });
  }

  // ici injection des services utilisés, en pas oublier "private"
  constructor(private assignmentsService: AssignmentsService, private ngZone:NgZone) {}

}
