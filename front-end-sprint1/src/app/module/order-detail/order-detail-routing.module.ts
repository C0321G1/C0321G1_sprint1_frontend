import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from '@angular/router';
import {OrderDetailComponent} from './order-detail/order-detail.component';

const routes: Routes = [
  {path: 'create', component: OrderDetailComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class OrderDetailRoutingModule { }
