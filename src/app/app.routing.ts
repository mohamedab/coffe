import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NavigationMenuComponent} from "./navigation-menu/navigation-menu.component";
import {AuthGuard} from "./shared/guards/login-auth.guard";

const routes: Routes = [
  {
    path: '', component: NavigationMenuComponent, children: [
      {path: '', redirectTo: '/menu', pathMatch: 'full'},
      {path: 'menu', loadChildren: () => import('./coffee-menu/coffee-menu.module').then(m => m.CoffeeMenuModule)},
      {path: 'order', loadChildren: () => import('./order-detail/order-detail.module').then(m => m.OrderDetailModule)},
      {path: 'about', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule)},
      {path: 'contact', loadChildren: () => import('./contact-info/contact-info.module').then(m => m.ContactInfoModule)},
      {path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)},
    ]
  },
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'reset', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)},
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule), canActivate:[AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
      initialNavigation: 'enabledBlocking', // for one load page, without reload
      // useHash: true
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
