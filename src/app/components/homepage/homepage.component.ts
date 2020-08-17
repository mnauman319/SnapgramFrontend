import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private titleService:Title) { }

  ngOnInit(): void {
    this.setTitle();
  }
  setTitle(){
    this.titleService.setTitle("SnapGram");
  }

}
