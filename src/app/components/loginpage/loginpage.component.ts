import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user'
import { Title } from '@angular/platform-browser';




@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css','./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {

  
  username:string;
  password:string;
  hidePassword:boolean = true;
  slideToggle:boolean = false;

  constructor(private router:Router, private userService:UserService,private titleService:Title) { }

  ngOnInit(): void {
    this.setTitle("SnapGram - Login");
    console.log(this.slideToggle);
  }

  toggleBox(status:boolean){
    this.slideToggle=status;
  }
  openRegistrationView() {
    this.setTitle("SnapGram - Register User");
    this.slideToggle=true;
  }

  async loginUser(){
    let user:User = await this.userService.attemptLogin(this.username,this.password);
    if(user !== null){
      this.userService.loggedInUser = user;
      console.log(user);
      
      this.router.navigateByUrl("/home");
    }else{
      alert("Incorrect Username or Password try again!");
    }
  }

  setTitle(title:string):void{

    this.titleService.setTitle(title);
  }
}
