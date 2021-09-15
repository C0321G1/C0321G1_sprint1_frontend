import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CustomerModule} from './module/customer/customer.module';
import {ServiceModule} from './module/service/service.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {HttpClientModule} from '@angular/common/http';
import {OrderModule} from "./module/order/order.module";
import {OrderDetailModule} from "./module/order-detail/order-detail.module";



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerModule,
    HttpClientModule,
    ServiceModule,
    OrderModule,
    OrderDetailModule,
    BrowserAnimationsModule,
    CommonModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
