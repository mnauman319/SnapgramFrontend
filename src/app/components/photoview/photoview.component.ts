import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core'
import { Photo } from '../../models/photo'

import { PhotoService } from 'src/app/services/photo.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-photoview',
  templateUrl: './photoview.component.html',
  styleUrls: ['./photoview.component.css']
})
export class PhotoviewComponent implements OnInit {

  photos:Photo[];
  
  constructor(private pserv:PhotoService, private router:Router) { }

  selectedPhoto:Photo;

  ngOnInit(): void {
    this.forTesting();
  }

  async forTesting(){
    this.photos = await this.pserv.getPhotosByUid(1);
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
