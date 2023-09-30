import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoffeeMenuComponent} from './coffee-menu/coffee-menu.component';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {NavigationMenuComponent} from './navigation-menu/navigation-menu.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from "@angular/material/divider";
import { AppPageBannerComponent } from './app-page-banner/app-page-banner.component';
import {MatTabsModule} from "@angular/material/tabs";
import { SpecialMenuComponent } from './special-menu/special-menu.component';
import { MenuOneComponent } from './menu-one/menu-one.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { TotalBarComponent } from './total-bar/total-bar.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { OrderDetailComponent } from './order-detail/order-detail.component';
import {MatTableModule} from "@angular/material/table";

// Create a function that returns an instance of TranslateHttpLoader
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CoffeeMenuComponent,
    NavigationMenuComponent,
    AppPageBannerComponent,
    SpecialMenuComponent,
    MenuOneComponent,
    FooterComponent,
    AboutUsComponent,
    ContactInfoComponent,
    TotalBarComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule, // Import HttpClientModule for translation
    TranslateModule.forRoot({
      defaultLanguage: 'en', // Set the default language
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    MatToolbarModule, MatButtonModule, MatSidenavModule, MatListModule, MatDividerModule,
    MatIconModule,
    MatTabsModule,
    FlexLayoutModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
