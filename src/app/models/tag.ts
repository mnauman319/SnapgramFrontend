import { Photo } from "./photo";

export class Tag{

    tagId:number;
    tagName:string;

    constructor(tagId:number,tagName:string) {
        this.tagId = tagId;
        this.tagName = tagName;
    }
}