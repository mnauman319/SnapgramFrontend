import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-photoupload',
  templateUrl: './photoupload.component.html',
  styleUrls: ['./photoupload.component.css']
})
export class PhotouploadComponent implements OnInit {

  constructor(private titleService:Title) { }

  ngOnInit(): void {
    this.setTitle();
  }

  setTitle(){
    this.titleService.setTitle("SnapGram - Upload Photo")
  }

}
