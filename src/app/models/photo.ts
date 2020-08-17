import { User } from './user';
import {Tag} from './tag';

export class Photo{

    photoId:number;
    photoUrl:string;
    photoName:string;
    photoDescription:string;
    tags:Tag[];
    
    constructor(photoId:number, photoUrl:string, photoName:string, photoDescription:string, tags:Tag[]) {
        this.photoId = photoId;
        this.photoUrl = photoUrl;
        this.photoName = photoName;
        this.photoDescription = photoDescription;
        this.tags = tags;
    }
}