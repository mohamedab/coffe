import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from './account.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {SharedModule} from "../shared/shared.module";
import {OrdersComponent} from "./orders/orders.component";
import {EditOrderComponent} from "./edit-order/edit-order.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {FormsModule} from "@angular/forms";
import {OrderDetailResolver} from "./resolvers/order-detail-rosolver";

export const routes: Routes = [
  {
    path: '',
    component: AccountComponent, children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'orders', component: OrdersComponent},
      { path: 'orders/:id', component: EditOrderComponent, resolve: {order: OrderDetailResolver}},
      { path: 'add-user', component: AddUserComponent},
      { path: 'profile', component: ProfileComponent},
      { path: 'dashboard', component: DashboardComponent}
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    AccountComponent,
    OrdersComponent,
    ProfileComponent,
    EditOrderComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule
  ]
})
export class AccountModule { }
