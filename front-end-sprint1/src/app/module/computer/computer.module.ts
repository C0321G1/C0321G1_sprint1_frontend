import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CreateComputerComponent} from './create-computer/create-computer.component';
import {EditComputerComponent} from './edit-computer/edit-computer.component';
import {ComputerRoutingModule} from "./computer-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {RouterModule} from "@angular/router";
import {ComputerListComponent} from './computer-list/computer-list.component';
import {ComputerDeleteComponent} from './computer-delete/computer-delete.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ComputerListDeleteComponent} from './computer-list-delete/computer-list-delete.component';


/*long-computer*/
@NgModule({

  declarations: [CreateComputerComponent, EditComputerComponent,
    ComputerListComponent, ComputerDeleteComponent, ComputerListDeleteComponent],
  exports: [
    CreateComputerComponent,
    EditComputerComponent
  ],
  imports: [
    CommonModule,
    ComputerRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    FormsModule,
    RouterModule,
  ]
  ,
})
export class ComputerModule {
}
