import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateCustomerComponent} from './module/customer/manager-customer/create-customer/create-customer.component';
import {EditCustomerComponent} from './module/customer/manager-customer/edit-customer/edit-customer.component';

const routes: Routes = [
  {
    path: 'create', component: CreateCustomerComponent
  },
  {
    path: 'edit', component:EditCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
