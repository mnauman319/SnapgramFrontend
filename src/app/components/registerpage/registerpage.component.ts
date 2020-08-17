import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { User } from 'src/app/models/user';
import { Title } from '@angular/platform-browser';


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
  hidePassword:boolean = true;
  constructor(private router:Router,private userService:UserService,private titleService:Title) { }

  ngOnInit(): void {
    this.setTitle();
  }
  async registerNewUser(){

    let user = new User(0,this.new_username,this.new_password,this.new_fname,this.new_lname);
    user = await this.userService.createUser(user);

    this.new_username = "";
    this.new_password = "";
    this.new_fname = "";
    this.new_lname = "";

    this.router.navigateByUrl("/login")
  }
  setTitle(){
    this.titleService.setTitle("SnapGram - Register User");
  }
}
