import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {CoffeeMenuComponent} from "./coffee-menu.component";


export const routes: Routes = [
  {path: '', component: CoffeeMenuComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    CoffeeMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CoffeeMenuModule {
}
