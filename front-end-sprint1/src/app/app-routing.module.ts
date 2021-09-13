import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateEmployeeComponent} from './module/employee/create-employee/create-employee.component';
import {EditEmployeeComponent} from './module/employee/edit-employee/edit-employee.component';


const routes: Routes = [
  {
    path: 'employee/create',
    component: CreateEmployeeComponent
  }, {
    path: 'employee/edit/:id',
    component: EditEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
