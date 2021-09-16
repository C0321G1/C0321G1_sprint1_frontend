import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CustomerModule} from './module/customer/customer.module';
import {AccountModule} from './module/account/account.module';
import {ComputerModule} from './module/computer/computer.module';
import {EmployeeModule} from './module/employee/employee.module';
import {GameModule} from './module/game/game.module';
import {OrderDetailModule} from './module/order-detail/order-detail.module';
import {ServiceModule} from './module/service/service.module';
import {RouterModule} from '@angular/router';
import {StatisticModule} from './module/statistic/statistic.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerModule,
    AccountModule,
    ComputerModule,
    EmployeeModule,
    GameModule,
    OrderDetailModule,
    ServiceModule,
    RouterModule,
    StatisticModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
