import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PhotouploadComponent } from './components/photoupload/photoupload.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { RegisterpageComponent } from './components/registerpage/registerpage.component';
import { PhotoviewComponent } from './components/photoview/photoview.component';

const routes: Routes = [
  {path:"home", component:HomepageComponent},
  {path:"upload", component:PhotouploadComponent},
  {path:"login", component:LoginpageComponent},
  {path:"register", component:RegisterpageComponent},
  {path:"photoviewtest", component:PhotoviewComponent},
  {path:"**",component:LoginpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
