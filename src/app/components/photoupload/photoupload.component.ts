import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PhotoService } from 'src/app/services/photo.service';
import { TagService } from 'src/app/services/tag.service';

import { User } from 'src/app/models/user';
import { Photo} from 'src/app/models/photo';
import { Tag } from 'src/app/models/tag';

@Component({
  selector: 'app-photoupload',
  templateUrl: './photoupload.component.html',
  styleUrls: ['./photoupload.component.css']
})
export class PhotouploadComponent implements OnInit {

  constructor(private router:Router, private titleService:Title, private userService:UserService, private photoService:PhotoService, private tagService:TagService) { }

  currentUser:User;
  photoToUpload:Photo;
  files: FileList = null;
  tagsToUpload: Tag[] = [];
  typedTagToSubmit: string;

  ngOnInit(): void {
    this.setTitle();
    this.currentUser = this.userService.loggedInUser;
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


  addLocalTag(){
    this.tagsToUpload.push(new Tag(null,this.typedTagToSubmit));

  }

  deleteLocalTag(tag){
    this.tagsToUpload = this.tagsToUpload.filter(item => item.tagName !== tag);
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
 
    // call create tag on all tags requested to be made.
    this.tagsToUpload.forEach(async tag => {
      let uploadedTag = await this.tagService.createTag(tag,this.currentUser.userId,uploadedPhoto.photoId);
    });

    

    // Navigate back to photoview
    this.router.navigateByUrl("/home");


  }
  setTitle(){
    this.titleService.setTitle("SnapGram - Upload Photo")
  }



}


