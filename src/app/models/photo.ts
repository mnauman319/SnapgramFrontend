import { User } from './user';
import {Tag} from './tag';

export class Photo{

    pId:number;
    photo_url:string;
    photo_name:string;
    photo_description:string;
    user:User;
    tags:Tag[]
    
    constructor(pId:number,
        uId:number,
        photo_url:string,
        photo_name:string,
        photo_description:string) {
        this.pId
        this.photo_url = photo_url;
        this.photo_name = photo_name;
        this.photo_description = photo_description;
    }
}