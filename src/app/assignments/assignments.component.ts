import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { map, pairwise, tap, filter, throttleTime } from 'rxjs/operators';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments : ';
  assignments: Assignment[] = [];

  // pour la pagination
  page=1;
  limit=30;
  prevPage;
  nextPage;
  totalDocs;
  totalPages;
  hasPrevPage;
  hasNextPage;

  // pour le scrolling infini
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  ancienneDistance:number;

  // ici injection des services utilisés, en pas oublier "private"
  constructor(private assignmentsService: AssignmentsService, private ngZone:NgZone) {}

  ngAfterViewInit() {
    // appelée APRES affichage
    console.log("### Dans le afterViewInit")

    // on va écouter des événements de scroll sur l'objet scroller (le scrolling infini)
    this.scroller.elementScrolled()
    .pipe(
      map(event => {
        return this.scroller.measureScrollOffset('bottom');
      }),
      pairwise(),
      filter(([y1, y2]) => {
        return y2 < y1 && y2 < 140;
      }),
      throttleTime(400) // on n'enverra un subscribe que toutes les 200ms (on ignorera les evenements entre...)
    ).subscribe(event => {
      this.ngZone.run(() => {
        this.pageSuivante();
        console.log("JE CHARGE")
      });
    })
  }

  ngOnInit(): void {
    // appelée AVANT affichage du composant
    console.log(
      'Composant assignments, dans le ngOnInit, on demande aux service le tableau des assignments'
    );
    /*
    this.assignmentsService.getAssignments()
    .subscribe((assignments) => {
      console.log('Dans le subscribe...');
      this.assignments = assignments;
    }); */
    this.getAssignmentsPourScroll();
  }

  getAssignmentsPourScroll() {
    this.assignmentsService.getAssignmentsPagines(this.page, this.limit)
    .subscribe(data => {
      this.page = data["page"];
      this.prevPage = data["prevPage"];
      this.nextPage = data["nextPage"];
      this.totalDocs = data['totalDocs'];
      this.totalPages = data["totalPages"];
      this.hasPrevPage = data["hasPrevPage"];
      this.hasNextPage = data["hasNextPage"];
      console.log("count = " + this.totalDocs, " nbPages = " + this.totalPages);

      // ici on agrandit le tableau des assignents en rajoutant à la fin
      // le nouveau tableau des assignments récupéré par la requête
      //this.assignments = this.assignments.concat(data['docs']);
      this.assignments = [...this.assignments, ...data['docs']]
    })
  }


  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignmentsPourScroll()
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignmentsPourScroll()
  }
}
