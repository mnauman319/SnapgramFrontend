import {Photo} from './photo';

export class User{

    uId:number;
    username:string;
    password:string;
    fName:string;
    lName:string;
    photos:Photo[]

    constructor(uId:number,username:string,password:string,fName:string,lName:string) {
        this.uId = uId;
        this.username = username;
        this.password = password;
        this.fName = fName;
        this.lName = lName;
    }
}