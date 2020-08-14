import { Photo } from "./photo";

export class Tag{

    tId:number;
    tag_name:string;
    photo:Photo;

    constructor(tId:number,
        tag_name:string,
        photo:Photo) {
        this.tId = tId;
        this.tag_name = tag_name;
        this.photo = photo;
    }
}