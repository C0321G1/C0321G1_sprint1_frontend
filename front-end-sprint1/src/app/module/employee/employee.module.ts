
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
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';


@NgModule({
  declarations: [ListEmployeeComponent, CreateEmployeeComponent, EditEmployeeComponent],
  exports: [
    ListEmployeeComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule,
    EmployeeRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ]
})
export class EmployeeModule { }
