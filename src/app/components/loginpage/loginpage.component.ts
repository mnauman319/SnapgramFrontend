import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  username:string;
  password:string;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  openRegistrationView(){
    this.router.navigateByUrl("/register");
  }

  validateUser(){
    //call login service
    //in login service decide whether or not to redirect or to send error to user
  }
}
