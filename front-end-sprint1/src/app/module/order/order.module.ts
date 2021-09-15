import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderPaymentComponent } from './order-payment/order-payment.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ServiceRoutingModule} from "../service/service-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ToastrModule} from "ngx-toastr";
import {OrderListComponent} from "./order-list/order-list.component";
import {OrderListCustomerComponent} from "./order-list-customer/order-list-customer.component";
import {OrderRoutingModule} from "./order-routing.module";
import {OrderDetailRoutingModule} from "../order-detail/order-detail-routing.module";
import {OrderDetailListComponent} from "./order-detail-list/order-detail-list.component";



@NgModule({
  declarations: [OrderPaymentComponent,OrderListComponent,OrderListCustomerComponent,OrderDetailListComponent],
  exports: [
    OrderListComponent,OrderListCustomerComponent,OrderPaymentComponent
  ],  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    OrderRoutingModule,
    OrderDetailRoutingModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    ToastrModule.forRoot()
  ]
})
export class OrderModule { }
