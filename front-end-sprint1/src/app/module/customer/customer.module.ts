import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerSignUpComponent} from './customer-sign-up/customer-sign-up.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from "@angular/platform-browser";
import {CustomerRoutingModule} from "./customer-routing.module";
import {RouterModule} from "@angular/router";




@NgModule({
  declarations: [CustomerSignUpComponent],
  exports: [
    CustomerSignUpComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    CustomerRoutingModule,
    RouterModule
  ]
})
export class CustomerModule { }
