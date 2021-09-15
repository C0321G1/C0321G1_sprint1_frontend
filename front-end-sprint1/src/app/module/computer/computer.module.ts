import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComputerComponent } from './create-computer/create-computer.component';
import { EditComputerComponent } from './edit-computer/edit-computer.component';
import {ComputerRoutingModule} from "./computer-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";


/*long-computer*/
@NgModule({
  declarations: [CreateComputerComponent, EditComputerComponent],
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
    BrowserAnimationsModule,
    RouterModule
  ]
})
export class ComputerModule { }
