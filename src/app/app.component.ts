import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './assignments/user.model';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titre = "Application de gestion d'Assignments POUR HEROKU CETTE FOIS-CI !";
  user:User;
  users:User[];

  constructor(private authService:AuthService,
              public router:Router,
              private assignmentsService:AssignmentsService) {}

  login(username:String, password:String) {
    
    this.assignmentsService.getUsers().subscribe((users) => {
      this.users = users;
    
      for (let item of Object.values(this.users)) {
        
        if (item.login === username && item.password === password) {
            console.log("YES");
            this.authService.logIn(item);
            // sauvegarder l'utilisateur
            this.user = item;
            // et on retourne à la page d'accueil pour afficher la liste
            this.router.navigate(['/home']);
        }
      }

      if(!this.user) alert("le login ou le mot de passe incorect !! ");
    });
  }

  isLogin(){
    return this.authService.loggedIn;
  }

}
