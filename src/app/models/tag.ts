import { Photo } from "./photo";

export class Tag{

    tagId:number;
    tagName:string;
    photo:Photo;

    constructor(tagId:number,
        tagName:string,
        photo:Photo) {
        this.tagId = tagId;
        this.tagName = tagName;
        this.photo = photo;
    }
}