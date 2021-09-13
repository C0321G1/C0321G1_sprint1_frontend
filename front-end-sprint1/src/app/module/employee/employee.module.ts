import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import {EmployeeRoutingModule} from './employee-routing.module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
    declarations: [CreateEmployeeComponent, EditEmployeeComponent],
  exports: [
    CreateEmployeeComponent,
    EditEmployeeComponent
  ],
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        ReactiveFormsModule
    ]
})
export class EmployeeModule { }
