import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core'
import { Photo } from '../../models/photo'
import { Tag } from '../../models/tag'
import { PhotoService } from 'src/app/services/photo.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { TagService } from 'src/app/services/tag.service';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-photoview',
  templateUrl: './photoview.component.html',
  styleUrls: ['./photoview.component.scss']
})
export class PhotoviewComponent implements OnInit {


  @Input() photos:Photo[];
  selectedPhoto:Photo;
  canEdit:boolean;

  deleteTagList:Tag[]=[];
  addTagList:Tag[]=[];
  tempTagList:Tag[]=[];
  tagNameInput:string="";

  photoTitleInput:string;
  photoDescInput:string;

  showDeleteConfirm:boolean =false;

  constructor(private pserv:PhotoService, private userv:UserService, 
    private router:Router, private tserv:TagService) { }

  ngOnInit(): void {
    this.canEdit = this.userv.loggedInUser.userId === this.pserv.searchedUserId;
  }


  selectPhoto(photo:Photo) {
    this.selectedPhoto = photo; 
    this.canEdit = this.userv.loggedInUser.userId === this.pserv.searchedUserId;
    this.tempTagList = Object.assign([], photo.tags);
    this.photoTitleInput = photo.photoName;
    this.photoDescInput = photo.photoDescription;
  }

  closeModal(){
    if(this.selectedPhoto!=null){
      this.selectedPhoto = null;
      this.tempTagList =[];
      this.tagNameInput = "";
      this.photoTitleInput="";
      this.photoDescInput="";
      this.showDeleteConfirm =false;
      this.addTagList=[];
      this.deleteTagList=[];
    }
  }

  //updates deleteTagList and addTagList
  deleteTag(tag:Tag){
    const index = this.tempTagList.indexOf(tag);
    this.tempTagList.splice(index,1);

    // Remove from addTagList
    if(tag.tagId === 0){
      this.addTagList.splice(this.addTagList.findIndex((x)=>{x.tagId===tag.tagId}),1);
    }

    // adds tag to deleteList only if tag exists in the Database
    //if(this.selectedPhoto.tags.find((x)=>{return x.tagId===tag.tagId})){
    if(this.selectedPhoto.tags.find((x)=>{return x.tagId===tag.tagId})){
      this.deleteTagList.push(tag);
    }
  }

  //add tag to addTagList; Does not allow duplicates.
  addTag(){
    if(this.tagNameInput!=="" && !this.tempTagList.find((x) => {return x.tagName===this.tagNameInput})){
      this.addTagList.push(new Tag(0, this.tagNameInput));
      this.tempTagList.push(new Tag(0, this.tagNameInput));
    }
    this.tagNameInput="";
  }

  async save(){
    for(let tag of this.addTagList){
      this.tserv.createTag(tag, 0, this.selectedPhoto.photoId);
    }

    for(let tag of this.deleteTagList){
      this.tserv.deleteTag(tag.tagId);
    }

    this.selectedPhoto.photoName = this.photoTitleInput;
    this.selectedPhoto.photoDescription = this.photoDescInput;
    this.selectedPhoto.tags=null;
    this.pserv.editPhoto(this.selectedPhoto, this.userv.loggedInUser.userId);

    //this.refreshPhotos();
    this.selectedPhoto.tags = this.tempTagList;
    this.closeModal();
  }

  tryDelete(){
    this.showDeleteConfirm=!this.showDeleteConfirm;

  }

  cancelDelete(){
    this.showDeleteConfirm=false;
  }

  async deletePhoto(){
    this.pserv.deletePhoto(this.selectedPhoto.photoId);
    const photoIndex = this.photos.findIndex((x)=>{return x.photoId===this.selectedPhoto.photoId});
    this.photos.splice(photoIndex,1);
    this.closeModal();
  }

  async refreshPhotos(){
    await this.pserv.getPhotosByUid(this.userv.loggedInUser.userId);
    this.photos = this.pserv.storedPhotos;
    console.log(this.photos);
  }
}
