import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { PhotoService } from 'src/app/services/photo.service';
import { User } from 'src/app/models/user';
import { Photo} from 'src/app/models/photo';

@Component({
  selector: 'app-photoupload',
  templateUrl: './photoupload.component.html',
  styleUrls: ['./photoupload.component.css']
})
export class PhotouploadComponent implements OnInit {

  constructor(private titleService:Title, private userService:UserService, private photoService:PhotoService) { }

  currentUser:User;
  photoToUpload:Photo;


  ngOnInit(): void {
    this.setTitle();
    this.currentUser = this.userService.loggedInUser;
    console.log(this.currentUser);
  }

  async uploadPhoto(files: FileList){

    console.log(files);
    let formData = new FormData();
    formData.append('file', files.item(0), files.item(0).name);

    let s3url= await this.photoService.uploadPhotoToS3(formData)
    console.log(s3url)
    
 

  }
  setTitle(){
    this.titleService.setTitle("SnapGram - Upload Photo")
  }



}


