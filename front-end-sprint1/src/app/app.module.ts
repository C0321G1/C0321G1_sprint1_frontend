import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CustomerModule} from './module/customer/customer.module';
import {OrderModule} from './module/order/order.module';
import {AccountModule} from './module/account/account.module';
import {ComputerModule} from './module/computer/computer.module';
import {EmployeeModule} from './module/employee/employee.module';
import {GameModule} from './module/game/game.module';
import {OrderDetailModule} from './module/order-detail/order-detail.module';
import {ServiceModule} from './module/service/service.module';
import {RouterModule} from '@angular/router';
import {StatisticModule} from './module/statistic/statistic.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';




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
    BrowserAnimationsModule,
    CommonModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AccountModule,
    ComputerModule,
    EmployeeModule,
    GameModule,
    OrderDetailModule,
    OrderModule,
    ServiceModule,
    RouterModule,
    StatisticModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
