import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import { CreateCustomerComponent } from './manager-customer/create-customer/create-customer.component';
import {CustomerRoutingModule} from './customer-routing.module';
import {MatSelectModule} from '@angular/material/select';
import { EditCustomerComponent } from './manager-customer/edit-customer/edit-customer.component';

@NgModule({
  declarations: [CreateCustomerComponent, EditCustomerComponent],
  exports: [
    CreateCustomerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule,
    CustomerRoutingModule,
    MatSelectModule
  ]
})
export class CustomerModule { }
