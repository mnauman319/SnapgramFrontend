import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core'
import { Photo } from '../../models/photo'

import { PhotoService } from 'src/app/services/photo.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-photoview',
  templateUrl: './photoview.component.html',
  styleUrls: ['./photoview.component.css']
})
export class PhotoviewComponent implements OnInit {

  // @Input() uId:number;

  
  
  photos:Photo[];
  
  constructor(private pserv:PhotoService, private router:Router,private userService:UserService) { }

  selectedPhoto:Photo;

  ngOnInit(): void {
    this.populatePhotos();
  }

  async populatePhotos(){
    this.photos = await this.pserv.getPhotosByUid(this.userService.loggedInUser.userId);
  }

  selectPhoto(photo:Photo) {
    this.selectedPhoto = photo; 
  }

  closeModal(){
    if(this.selectedPhoto!=null){
      this.selectedPhoto = null;
    }
  }
}
