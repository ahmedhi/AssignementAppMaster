import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map, pairwise, tap, filter, throttleTime } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
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

  constructor(private appComponent:AppComponent,
              private router:Router,
              private ngZone:NgZone) {}

  ngOnInit(): void { }
  onSubmit() {
    this.appComponent.login( this.username , this.password );
  };

}


