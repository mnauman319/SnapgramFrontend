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
  files: FileList = null;


  ngOnInit(): void {
    this.setTitle();
    this.currentUser = this.userService.loggedInUser;
    console.log(this.currentUser);
    this.photoToUpload = new Photo(null,"","","",null);
  }

  onFileChange(event){
    this.files = event.target.files;
  }

  onPhotoNameChange(event){
 
    this.photoToUpload.photoName = event.target.value
  }
  onPhotoDescriptionChange(event){
    this.photoToUpload.photoDescription = event.target.value
  }


  async uploadPhoto(){

    console.log(this.files);
    let formData = new FormData();
    formData.append('file', this.files.item(0), this.files.item(0).name);

    let s3url= await this.photoService.uploadPhotoToS3(formData)
    console.log(s3url)

    // Set s3url to photo object
    this.photoToUpload.photoUrl = s3url.toString();

    // Call createPhoto to post photo to current user
    console.log(this.photoToUpload);
    let uploadedPhoto = await this.photoService.createPhoto(this.photoToUpload,this.currentUser.userId);

    console.log(uploadedPhoto);
 

  }
  setTitle(){
    this.titleService.setTitle("SnapGram - Upload Photo")
  }



}


