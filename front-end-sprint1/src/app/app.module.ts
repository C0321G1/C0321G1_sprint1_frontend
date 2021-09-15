import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {CustomerModule} from './module/customer/customer.module';
import {AccountModule} from './module/account/account.module';
import {EmployeeModule} from './module/employee/employee.module';
import {GameModule} from './module/game/game.module';
import {OrderDetailModule} from './module/order-detail/order-detail.module';
import {ServiceModule} from './module/service/service.module';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ComputerModule} from './module/computer/computer.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComputerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
