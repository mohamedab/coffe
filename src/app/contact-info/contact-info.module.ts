import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {ContactInfoComponent} from "./contact-info.component";


export const routes: Routes = [
  {path: '', component: ContactInfoComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    ContactInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ContactInfoModule {
}
