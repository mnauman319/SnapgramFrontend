import { Injectable } from '@angular/core';
import { Photo } from '../models/photo';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  searchedUserId:number = this.userv.loggedInUser.userId;
  storedPhotos:Photo[];
  baseUrl:string = environment.baseUrl;

  constructor(private http:HttpClient, private userv:UserService) { }

  async createPhoto(photo:Photo, uId:number):Promise<Photo>{
    photo = await this.http.post<Photo>(`${this.baseUrl}/${uId}/photos/`, photo).toPromise();
    return photo;
  }

  async getPhotosByUidAndTag(uId:number, hashtag:string):Promise<Array<Photo>>{
    const photos:Array<Photo> = await this.http.get<Array<Photo>>(`${this.baseUrl}/users/${uId}/photos?hashtag=${hashtag}`).toPromise();
    photos.sort(function(a,b){return b.photoId-a.photoId});
    return photos;
  }

  async getPhotosByUid(uId:number){
    const photos:Array<Photo> = await this.http.get<Array<Photo>>(`${this.baseUrl}/users/${uId}/photos`).toPromise();
    photos.sort(function(a,b){return b.photoId-a.photoId});
    this.searchedUserId= uId;
    this.storedPhotos = photos;
    //return photos;
  }

  async getPhotoById(pId:number):Promise<Photo>{
    const photo:Photo = await this.http.get<Photo>(`${this.baseUrl}/users/0/photos/${pId}`).toPromise();
    return photo;
  }

  async editPhoto(photo:Photo, uId:number):Promise<Photo>{
    const editedPhoto = await this.http.put<Photo>(`${this.baseUrl}/users/${uId}/photos`, photo).toPromise();
    return editedPhoto;
  }


  async deletePhoto(pId:number):Promise<void>{
    await this.http.delete<void>(`${this.baseUrl}/users/0/photos/${pId}`).toPromise();
  }


  async uploadPhotoToS3(file: FormData){
   const s3url = await this.http.post(`${this.baseUrl}/s3/upload/`, file).toPromise();
   return s3url;
  }
}
