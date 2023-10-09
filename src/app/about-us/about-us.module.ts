import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutUsComponent} from "./about-us.component";
import { RouterModule, Routes } from '@angular/router';
import {SharedModule} from "../shared/shared.module";


export const routes: Routes = [
  {path: '', component: AboutUsComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AboutUsModule {
}
