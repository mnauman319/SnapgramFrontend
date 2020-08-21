import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PhotoService } from 'src/app/services/photo.service';
import { TagService } from 'src/app/services/tag.service';

import { User } from 'src/app/models/user';
import { Photo} from 'src/app/models/photo';
import { Tag } from 'src/app/models/tag';
import { ViewChild, ElementRef} from "@angular/core";
import * as tf from "@tensorflow/tfjs";
import { IMAGENET_CLASSES } from "src/assets/imagenet-classes";
import { SelectorFlags } from '@angular/compiler/src/core';

const IMAGE_SIZE = 224;
const TOPK_PREDICTIONS = 2;

@Component({
  selector: 'app-photoupload',
  templateUrl: './photoupload.component.html',
  styleUrls: ['./photoupload.component.scss']
})
export class PhotouploadComponent implements OnInit {
  @Output() changeTitle = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter<boolean>();
  constructor(private router:Router, private titleService:Title, private userService:UserService, private photoService:PhotoService, private tagService:TagService) { }

  currentUser:User;
  photoToUpload:Photo;
  files: FileList;
  tagsToUpload: Tag[] = [];
  typedTagToSubmit: string;

  model: tf.Model;
  classes: any[];
  imageData: ImageData;

  @ViewChild("chosenImage") img: ElementRef;
  @ViewChild("fileUpload") fileUpload: ElementRef;

  async ngOnInit() {
    this.setTitle();
    this.currentUser = this.userService.loggedInUser;
    this.photoToUpload = new Photo(null,"","","",null);

    this.loadModel();

  }
  async onFileChange(event) {
    this.tagsToUpload = []

    const file = event.target.files;

    await this.setFiles(event);
    this.classes = []
    const reader = new FileReader();

     reader.onload = async e => {

      await this.getImgSrc(e,event);

      await this.predict(this.img.nativeElement);

      console.log(this.img.nativeElement);
    };
    reader.readAsDataURL(file[0]);
  }

  async setFiles(event){
    this.files = event.target.files;
  }
  async getImgSrc(e,event){
    this.img.nativeElement.src = e.target["result"]
    this.files = event.target.files;
  }

  async setPredictionsAsTags(){

    this.classes.forEach(currClass => {
  
      this.tagsToUpload.push(new Tag(null,currClass.className));
      
    });
    


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

    this.changeTitle.next("SnapGram");
    this.closeModal.next(true);
    // // Navigate back to photoview
    // this.router.navigateByUrl("/home");

  }
  setTitle(){
    this.titleService.setTitle("SnapGram - Upload Photo")
  }

async loadModel() {
  this.model = await tf.loadModel("../assets/model.json");
}

async predict(imageData: ImageData): Promise<any> {
  console.log(this.classes)
 // this.fileUpload.nativeElement.value = "";
  const logits = await tf.tidy( () => {
    // tf.fromPixels() returns a Tensor from an image element.
    const img =  tf.fromPixels(imageData).toFloat();

    const offset = tf.scalar(127.5);
    // Normalize the image from [0, 255] to [-1, 1].
    const normalized = img.sub(offset).div(offset);

    // Reshape to a single-element batch so we can pass it to predict.
    const batched = normalized.reshape([1, IMAGE_SIZE, IMAGE_SIZE, 3]);

    // Make a prediction through mobilenet.
    return this.model.predict(batched);
  });

  // Convert logits to probabilities and class names.
  this.classes = await this.getTopKClasses(logits, TOPK_PREDICTIONS);

  /* Update tags with predictions */
  await this.setPredictionsAsTags();

}


async getTopKClasses(logits, topK): Promise<any[]> {
  const values = await logits.data();

  const valuesAndIndices = [];
  for (let i = 0; i < values.length; i++) {
    valuesAndIndices.push({ value: values[i], index: i });
  }
  valuesAndIndices.sort((a, b) => {
    return b.value - a.value;
  });
  const topkValues = new Float32Array(topK);
  const topkIndices = new Int32Array(topK);
  for (let i = 0; i < topK; i++) {
    topkValues[i] = valuesAndIndices[i].value;topkIndices[i] = valuesAndIndices[i].index;
  }

  const topClassesAndProbs = [];
  for (let i = 0; i < topkIndices.length; i++) {
    topClassesAndProbs.push({className: IMAGENET_CLASSES[topkIndices[i]],probability: topkValues[i]});
  }
  return topClassesAndProbs;
}


}


