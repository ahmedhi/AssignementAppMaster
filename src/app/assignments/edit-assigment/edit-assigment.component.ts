import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css'],
})
export class EditAssigmentComponent implements OnInit {
  nomAssignment = '';
  dateDeRendu = null;
  assignment: Assignment;

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route:ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // on doit récupérer l'id dans l'URL, et on doit utiliser
    // le service de gestion des assignments pour récupérer l'assignment
    // qui a cet id
    // Le "+ ci-dessous force la conversion string vers number (les urls sont des strings)"
    this.getAssignment();

    // récupération des queryParams
    let nom = this.route.snapshot.queryParams.nom;
    //console.log("nom récupéré dans l'URL : " + nom)
    console.log(this.route.snapshot.queryParams);

    console.log("fragment = " + this.route.snapshot.fragment)
  }

  // récupère l'id puis l'assignment correspondant
  getAssignment() {
    let id = +this.route.snapshot.params.id;
    console.log('Dans le ngOnInit id récupéré = ' + id);

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;
      // pour que le formulaire affiche les noms et dates
      this.nomAssignment = this.assignment.nom;
      this.dateDeRendu = this.assignment.dateDeRendu;
    });
  }

  onSaveAssignment(event) {
    // on ne veut pas que ça soumette le formulaire, on va donc
    // "empêcher le comportement par défaut"
    // permet d'éviter le warning
    event.preventDefault();

    if(this.nomAssignment) {
      this.assignment.nom = this.nomAssignment;
    }

    if(this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((reponseObject) => {
        console.log(reponseObject.message);

        // et on retourne à la page d'accueil pour afficher la liste
        this.router.navigate(['/home']);
      });
  }
}
