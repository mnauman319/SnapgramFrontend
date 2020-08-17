import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router:Router,private titleService:Title,private userService:UserService) { }

  currentUser:string = this.userService.loggedInUser.username;
  searchName:string;
  user:User;
  ngOnInit(): void {
    this.setTitle();
  }
  setTitle(){
    this.titleService.setTitle("SnapGram");
  }

  openUploadPhoto(){
    this.router.navigateByUrl("/upload")
  }
  signOut(){
    this.userService.clearUser();
    this.router.navigateByUrl("/login");
  }
  async search(){
   this.user = await this.userService.searchUserByUsername(this.searchName);
   if(this.user !== null){
    //redirect to that users homepage
    console.log(`Searched user has ${this.user.userId} as their userId`);
    
   }
    
  }
}
