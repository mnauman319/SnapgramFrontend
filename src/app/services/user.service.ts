import { Injectable } from '@angular/core';
import { User } from '../models/user'
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedInUser:User;
  

  constructor(private http:HttpClient) { }

  async createUser(user:User):Promise<User>{
    user = await this.http.post<User>("http://localhost:8080/users",user).toPromise();
    return user;
  }

  async searchUserByUsername(username:string){
    let user:User;
    user = await this.http.get<User>(`http://localhost:8080/users?username=${username}`).toPromise();
    return user;
  }

  async attemptLogin(username:string,password:string):Promise<User>{
    let httpResponse = await this.http.post<User>("http://localhost:8080/login",{username, password}).toPromise();
    return httpResponse;
  }
}
