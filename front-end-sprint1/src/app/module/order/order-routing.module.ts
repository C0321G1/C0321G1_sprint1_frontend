import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OrderListComponent} from "./order-list/order-list.component";
import {OrderListCustomerComponent} from "./order-list-customer/order-list-customer.component";

// huynh code
const routes: Routes = [
  {path: 'list', component: OrderListComponent},
  {path: 'list-order-customer', component: OrderListCustomerComponent},
  {path: 'payment-cancel', component: OrderListCustomerComponent},
  {path: 'payment-success', component: OrderListCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
