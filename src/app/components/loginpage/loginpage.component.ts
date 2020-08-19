import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user'
import { Title } from '@angular/platform-browser';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css','./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {


  username:string;
  password:string;
  hidePassword:boolean = true;

  constructor(private router:Router, private userService:UserService,private titleService:Title) { }

  ngOnInit(): void {
    this.setTitle();
  }

  openRegistrationView(){
    this.router.navigateByUrl("/register");
  }

  async loginUser(){
    let user:User = await this.userService.attemptLogin(this.username,this.password);
    if(user !== null){
      this.userService.loggedInUser = user;
      this.router.navigateByUrl("/home");
    }else{
      alert("Incorrect Username or Password try again!");
    }
  }
  setTitle(){
    this.titleService.setTitle("SnapGram - Login");
  }
}
