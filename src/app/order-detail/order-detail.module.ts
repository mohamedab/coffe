import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {OrderDetailComponent} from "./order-detail.component";
import {FormsModule} from "@angular/forms";


export const routes: Routes = [
  {path: '', component: OrderDetailComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule
  ]
})
export class OrderDetailModule {
}
