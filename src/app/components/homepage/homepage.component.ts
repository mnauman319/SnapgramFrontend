import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Photo } from '../../models/photo'
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss', './homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router:Router,private titleService:Title,private userService:UserService,
    private photoService:PhotoService) { }
  
  currentUser:User;
  searchName:string;
  user:User = this.userService.loggedInUser;
  uploadModal:boolean;
  

 // storedPhotos:Photo[] = this.photoService.storedPhotos;     //storaged of searched user's photos
  displayedPhotos:Photo[];  //photo array sent to photoview component
  filterInput:string;       //string input for filtering storedPhotos

  ngOnInit(): void {

    // //It will not allow people to go to home page if they are not logged in
    if(this.userService.loggedInUser === undefined){
      this.router.navigateByUrl("/login")
    }
    else{
      this.currentUser = this.userService.loggedInUser;
      this.getUserPhotos(this.currentUser.userId);
    }

      // this.setCurrentUser();

    //  this.setCurrentUser();


      this.setTitle("SnapGram");
  }
  setTitle(title:string){
    this.titleService.setTitle(title);
  }

  // async setCurrentUser(){
  //   let user:User = await this.userService.testingUser();
  //   this.currentUser = user;
  // }

  async getUserPhotos(userId:number){
    await this.photoService.getPhotosByUid(userId);
    this.displayedPhotos = this.photoService.storedPhotos;
    this.filterInput= "";
  }

  // Filters storedPhotos array using filterInput and then sets filteredPhotos as new displayedPhotos
  filter(){
    if(this.filterInput !== ""){
      let filteredPhotos:Photo[]=[];
      
      for(let photo of this.photoService.storedPhotos){
        
        if(photo.photoName.includes(this.filterInput)){
          filteredPhotos.push(photo);
        }else{
        for(let tag of photo.tags){
          if(tag.tagName.includes(this.filterInput)){
            filteredPhotos.push(photo);
            break;
          }
        }
        }
      }
      this.displayedPhotos = filteredPhotos;
     }else{
      this.displayedPhotos = this.photoService.storedPhotos;
     }
  }

  openUploadModal(){
    this.uploadModal = true;
  }

  closeUploadModal(){
    this.uploadModal = false;
    this.getUserPhotos(this.currentUser.userId);
    this.setTitle("SnapGram");
  }
  signOut(){
    this.userService.clearUser();
    this.router.navigateByUrl("/login");
  }

  //Sets new storedPhotos value
  async search(){
   this.user = await this.userService.searchUserByUsername(this.searchName);
   if(this.user !== null){
    this.getUserPhotos(this.user.userId);
   }
   if(this.searchName ===""){
     this.user = this.currentUser;
     this.getUserPhotos(this.user.userId);
   }
   

  }
  
  
}
