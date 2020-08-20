import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http:HttpClient) { }
  async createTag(tag:Tag,uId:number, pId:number):Promise<Tag>{
    tag = await this.http.post<Tag>(`http://localhost:8080/users/${uId}/photos/${pId}/tags`,tag).toPromise();
    return tag;
  }

  async deleteTag(tId:number):Promise<boolean>{
    return await this.http.delete<boolean>(`http://localhost:8080/users/0/photos/0/tags/${tId}`).toPromise();
  }                                                                                                                                                                                                                                                                                                                                                                           
}
