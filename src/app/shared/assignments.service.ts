import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Assignment } from '../assignments/assignment.model';
import { User } from '../assignments/user.model';
import { LoggingService } from './logging.service';
import { data } from './assignmentsData';
import { AssignmentCat } from '../assignments/assignmentCat.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  /*
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
  */

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

  getAssignementsCategories(): Observable<AssignmentCat[]> {
    return of(this.assignmentsCat);
  }

  constructor(private loggingService:LoggingService,
              private http:HttpClient) { }

  uri = "https://easy-attendance-api.herokuapp.com/api/assignments";
  uriLogin = "https://easy-attendance-api.herokuapp.com/api/users";

  getAssignments():Observable<Assignment[]> {
    console.log("Assignements from DB : " + this.http.get<Assignment[]>(this.uri));
    return this.http.get<Assignment[]>(this.uri);
  }

  getUsers():Observable<User[]> {
    console.log("Users from DB : " + this.http.get<User[]>(this.uriLogin));
    return this.http.get<User[]>(this.uriLogin);
  }

  getAssignmentsPagines(page:number, limit:number):Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri+ "?page=" + page + "&limit=" + limit);
  }

  getAssignment(id:number):Observable<Assignment> {
    return this.http.get<Assignment>(this.uri + "/" + id)
    .pipe(
      tap(a => {
        console.log("Dans pipe/tap j'ai récupéré assignement nom = " +a.nom)
      }),
      map(a => {
        return a;
      }),
      catchError(this.handleError<Assignment>("getAssignment avec id = " + id))
    );
  }

  private handleError<T>(operation, result?:T) {
    return(error:any):Observable<T> => {
      console.log(error); // pour afficher l'erreur dans la console
      console.log(operation + " a échoué " + error.message);

      return of(result as T);
    }
  }

  addAssignment(assignment:Assignment):Observable<any> {
    assignment.id = Math.floor(Math.random() * 100000);

    this.loggingService.log(assignment.nom, "ajouté")

    console.log( "Assignment = " + assignment );

    return this.http.post<Assignment>(this.uri, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // ici envoyer requête PUT à une base de données...
    this.loggingService.log(assignment.nom, "modifié")

    console.log( assignment );

    return this.http.put<Assignment>(this.uri, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    this.loggingService.log(assignment.nom, "supprimé");
    return this.http.delete(this.uri + "/" + assignment._id);
  }

  // autre version qui permet de récupérer un subscribe une fois que tous les inserts
  // ont été effectués
  peuplerBDJoin(): Observable<any> {
    const calls=[];

    data.forEach((a) => {
      const new_assignment = new Assignment();
      new_assignment.nom = a.nom;
      new_assignment.dateDeRendu = new Date(a.dateDeRendu);
      new_assignment.rendu = a.rendu;
      new_assignment.student = a.student;
      new_assignment.remarque = a.remarque;
      new_assignment.note = a.note;
      calls.push(this.addAssignment(new_assignment));
    });
    return forkJoin(calls); // renvoie un seul Observable pour dire que c'est fini
  }
}
