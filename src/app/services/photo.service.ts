import { Injectable } from '@angular/core';
import { Photo } from '../models/photo';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http:HttpClient) { }

  async createPhoto(photo:Photo, uId:number):Promise<Photo>{
    photo = await this.http.post<Photo>(`http://localhost:8080/user/${uId}/photos`, photo).toPromise();
    return photo;
  }

  async getPhotos(uId:number, hashtag:string):Promise<Array<Photo>>{
    const photos:Array<Photo> = await this.http.get<Array<Photo>>(`http://localhost:8080/users/${uId}/photos?hastag=${hashtag}`).toPromise();
    photos.sort(function(a,b){return b.photoId-a.photoId});
    return photos;
  }

  async getPhotoById(pId:number):Promise<Photo>{
    const photo:Photo = await this.http.get<Photo>(`http://localhost:8080/users/0/photos/${pId}`).toPromise();
    return photo;
  }

  async editPhoto(photo:Photo):Promise<Photo>{
    const editedPhoto = await this.http.put<Photo>("http://localhost:8080/users/0/photos", photo).toPromise();
    return editedPhoto;


  async deletePhoto(pId:number):Promise<void>{
    await this.http.delete<void>(`http://localhost:8080/users/0/photos/${pId}`).toPromise();
  }

}
