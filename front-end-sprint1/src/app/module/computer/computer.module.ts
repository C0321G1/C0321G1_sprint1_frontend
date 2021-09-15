import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { ComputerDeleteComponent } from './computer-delete/computer-delete.component';
import {ComputerRoutingModule} from './computer-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule} from "@angular/forms";
import { ComputerListDeleteComponent } from './computer-list-delete/computer-list-delete.component';


@NgModule({
  declarations: [ComputerListComponent, ComputerDeleteComponent, ComputerListDeleteComponent],
  imports: [
    CommonModule,
    ComputerRoutingModule,
    HttpClientModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    FormsModule
  ]
})
export class ComputerModule { }
