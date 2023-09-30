import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoffeeMenuComponent} from "./coffee-menu/coffee-menu.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {ContactInfoComponent} from "./contact-info/contact-info.component";

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'menu', component: CoffeeMenuComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
