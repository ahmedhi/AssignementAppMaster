import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { map, pairwise, tap, filter, throttleTime } from 'rxjs/operators';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from '../user.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users : User[];
  username = '';
  password = '';
  userLogged : User;
  

  ngOnInit(): void { }
  onSubmit() {
      console.log("username : " + this.username + " password : "+ this.password);
      this.assignmentsService.getUsers().subscribe((users) => {
        this.users = users;
        console.log("INFOS  : "+JSON.stringify(this.users));
        for (let item of Object.values(this.users)) {
          
          if (item.login === this.username && item.password === this.password) {
             console.log("YES");
             this.userLogged = item ;
             AuthService.logIn(this.userLogged);
          }else {
            alert("le login ou le mot de passe incorect !! ")
          }
      }
      });
      
     
  }
  
  constructor(private assignmentsService: AssignmentsService, private ngZone:NgZone) {}

}


