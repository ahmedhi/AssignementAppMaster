import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [
    {
      id:1,
      nom:"Devoir Angular Mr Buffa No 1",
      dateDeRendu: new Date("03/21/2021"),
      rendu:false
    },
    {
      id:2,
      nom:"Gestion de projet, rapport pour Mr Winter",
      dateDeRendu:new Date("03/25/2021"),
      rendu:false
    },
    {
      id:3,
      nom:"Devoir ERP pour Mr Yosi Gal",
      dateDeRendu:new Date("01/04/2021"),
      rendu:true
    }
  ];

  constructor(private loggingService:LoggingService) { }

  getAssignments():Observable<Assignment[]> {
    return of(this.assignments);
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
