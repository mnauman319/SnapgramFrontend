import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { User } from 'src/app/models/user';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.scss']
})
export class RegisterpageComponent implements OnInit {

  @Output() slideToggleBack = new EventEmitter<boolean>();
  @Output() changeTitle = new EventEmitter<string>();
  new_username:string;
  new_password:string;
  new_fname:string;
  new_lname:string;
  hidePassword:boolean = true;
  
  constructor(private router:Router,private userService:UserService,private titleService:Title) { }

  ngOnInit(): void {
    
  }
  async registerNewUser(){

    let newUser = new User(0,this.new_username,this.new_password,this.new_fname,this.new_lname);
    let oldUser:User = await this.userService.searchUserByUsername(newUser.username);
    if(oldUser !== null && oldUser.password === newUser.password){
      alert("This is already registered. Please enter a new user or attempt to login.");
    }else{
      newUser = await this.userService.createUser(newUser);

    this.new_username = "";
    this.new_password = "";
    this.new_fname = "";
    this.new_lname = "";

    this.router.navigateByUrl("/login")
    }
  }
  
  setTitle(){
  }

  openSignInView() :void {
    this.slideToggleBack.next(false);
    this.changeTitle.next("SnapGram - Login");

  }
}
