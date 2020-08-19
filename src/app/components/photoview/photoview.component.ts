import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core'
import { Photo } from '../../models/photo'

import { PhotoService } from 'src/app/services/photo.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photoview',
  templateUrl: './photoview.component.html',
  styleUrls: ['./photoview.component.css']
})
export class PhotoviewComponent implements OnInit {


  @Input() photos:Photo[];
  selectedPhoto:Photo;

  constructor(private pserv:PhotoService, private userv:UserService, private router:Router) { }

  ngOnInit(): void {}


  selectPhoto(photo:Photo) {
    this.selectedPhoto = photo; 
  }

  closeModal(){
    if(this.selectedPhoto!=null){
      this.selectedPhoto = null;
    }
  }
}
