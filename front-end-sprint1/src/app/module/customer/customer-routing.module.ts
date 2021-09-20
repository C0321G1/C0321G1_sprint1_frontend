import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CustomerSignUpComponent} from './customer-sign-up/customer-sign-up.component';

const routes: Routes = [
  {
    path: 'signUp', component: CustomerSignUpComponent
  }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class CustomerRoutingModule {
}
