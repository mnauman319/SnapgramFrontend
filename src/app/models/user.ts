import {Photo} from './photo';

export class User{

    userId:number;
    username:string;
    password:string;
    fName:string;
    lName:string;
    photos:Photo[]

    constructor(uId:number,username:string,password:string,fName:string,lName:string) {
        this.userId = uId;
        this.username = username;
        this.password = password;
        this.fName = fName;
        this.lName = lName;
    }
}