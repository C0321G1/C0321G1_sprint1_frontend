import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListEmployeeComponent} from './list-employee/list-employee.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EmployeeRoutingModule} from './employee-routing.module';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  declarations: [ListEmployeeComponent],
  exports: [
    ListEmployeeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule,
    BrowserModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
