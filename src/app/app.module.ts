import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';


import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PhotouploadComponent } from './components/photoupload/photoupload.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { RegisterpageComponent } from './components/registerpage/registerpage.component';
import { PhotoviewComponent } from './components/photoview/photoview.component';
import { UserService } from './services/user.service';
import { TagService } from './services/tag.service';
import { PhotoService } from './services/photo.service';




@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PhotouploadComponent,
    LoginpageComponent,
    RegisterpageComponent,
    PhotoviewComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatDividerModule, 
    MatIconModule
  ],
  providers: [UserService,TagService,PhotoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
