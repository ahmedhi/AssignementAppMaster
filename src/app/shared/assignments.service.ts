import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { AssignmentCat } from '../assignments/assignmentCat.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [
    {
      id:1,
      nom:"Apex",
      dateDeRendu: new Date("03/21/2021"),
      rendu: false,
      student: 'Ahmed HILALI',
      remarque: 'lorem jnjdnjnsd jsdjdnjsndjnrl flrflrfr snjdn jsn  r,nfkr,kr sudb',
      note: 0,
    },
    {
      id:2,
      nom:"Visual Force",
      dateDeRendu:new Date("03/25/2021"),
      rendu:false,
      student: 'Ahmed HILALI',
      remarque: '',
      note: 0,
    },
    {
      id:3,
      nom:"Visual Force",
      dateDeRendu:new Date("01/04/2021"),
      rendu:true,
      student: 'Askour Hamza',
      remarque: '',
      note: 0,
    }
  ];

  assignmentsCat:AssignmentCat[] = [
    {
      nom : "Apex",
      teacher : "Karam MOHAMED",
    },
    {
      nom : "Visual Force",
      teacher : "Achraf CHOUCHOU",
    },
    {
      nom : "Angular",
      teacher : "Michel BUFFA",
    },
    {
      nom : "Architecture des composants",
      teacher : "Richard Grin",
    }
  ] 

  constructor(private loggingService:LoggingService) { }

  getAssignments():Observable<Assignment[]> {
    return of(this.assignments);
  }

  getAssignementsCategories(): Observable<AssignmentCat[]> {
    return of(this.assignmentsCat);
  }

  getAssignmentsByCategorie( categorie ): Observable<Assignment[]>{
    return of(this.assignments.filter(object => {
      return object['nom'] == categorie;
    }));
  }

  getAssignment(id:number):Observable<Assignment> {
    let assignementCherche = this.assignments.find(a => a.id === id);
    return of(assignementCherche);
  }

  addAssignment(assignment:Assignment):Observable<string> {
    assignment.id = Math.floor(Math.random() * 100000);

    this.assignments.push(assignment);

    this.loggingService.log(assignment.nom, "ajouté")

    return of("Assignment service: assignment ajouté !")
  }

  updateAssignment(assignment:Assignment):Observable<string> {
    // ici envoyer requête PUT à une base de données...

    // En fait on a besoin de rien faire de spécial si on travaille avec
    // un tableau car le paramètre passé EST UN ELEMENT DU TABLEAU
    // et si on l'a modifié dans le composant details, par exemple
    // en mettant sa propriété rendu à true, et bien, cela
    // l'a aussi modifié dans le tableau

    this.loggingService.log(assignment.nom, "modifié")

    return of("Assignment service: assignment modifié !")
  }

  deleteAssignment(assignment:Assignment):Observable<string> {
    let pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);

    this.loggingService.log(assignment.nom, "supprimé");


    return of("Assignment service: assignment supprimé !")
  }


}
