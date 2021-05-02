import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor() { }

  ngOnInit(): void {
   
  }
  onSubmit() {
      console.log("username : " + this.username + " password : "+ this.password);
      
  }
  
  

}
