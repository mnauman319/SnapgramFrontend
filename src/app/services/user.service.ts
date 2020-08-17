import { Injectable } from '@angular/core';
import { User } from '../models/user'
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  //if we want to persist the data through refreshes then we need to use local storage or cookie
  //this userService will get cleared on refresh
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
  clearUser(){
    this.loggedInUser.userId = 0;
    this.loggedInUser.username ="";
    this.loggedInUser.password ="";
    this.loggedInUser.fName ="";
    this.loggedInUser.lName ="";
    this.loggedInUser.photos =[];
  }
}
