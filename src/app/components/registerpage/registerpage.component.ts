import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {

  new_username:string;
  new_password:string;
  new_fname:string;
  new_lname:string;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  registerNewUser(){
    //call register service
    this.router.navigateByUrl("/login")
  }
}
