export class User{

    uId:number;
    username:string;
    password:string;
    first_name:string;
    last_name:string;
    //still need set of photos

    constructor(uId:number,username:string,password:string,first_name:string,last_name:string) {
        this.uId = uId;
        this.username = username;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
    }
}