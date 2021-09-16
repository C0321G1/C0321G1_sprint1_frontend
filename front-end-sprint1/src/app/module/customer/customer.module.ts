import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerSignUpComponent} from './customer-sign-up/customer-sign-up.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';




@NgModule({
  declarations: [CustomerSignUpComponent],
  exports: [
    CustomerSignUpComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class CustomerModule { }
