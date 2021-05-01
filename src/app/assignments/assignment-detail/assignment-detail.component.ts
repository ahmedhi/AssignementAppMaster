import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis:Assignment;

  constructor(private assignmentsService:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router) {}

  ngOnInit(): void {
    // on doit récupérer l'id dans l'URL, et on doit utiliser
    // le service de gestion des assignments pour récupérer l'assignment
    // qui a cet id
    // Le "+ ci-dessous force la conversion string vers number (les urls sont des strings)"
    this.getAssignment();
  }

  // récupère l'id puis l'assignment correspondant
  getAssignment() {
    let id = +this.route.snapshot.params.id;
    console.log("Dans le ngOnInit id récupéré = " + id);

    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        this.assignmentTransmis = assignment;
      })
  }

  onAssignmentRendu() {
    this.assignmentTransmis.rendu = true;

    this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(["/home"]);
      });
  }

  onDelete() {
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
    .subscribe(message => {
      console.log(message);
      this.assignmentTransmis = null;
      // on vaigue programmatiquement
      this.router.navigate(["/home"]);
    })
  }

  onClickEdit() {
    this.router.navigate(["assignments", this.assignmentTransmis.id, "edit"],
    {
      queryParams: {nom:"BUFFA", prenom:"MICHEL", age:55, instrument:"Guitare Electrique"},
      fragment:"SECTION1"
    });
  }
}
