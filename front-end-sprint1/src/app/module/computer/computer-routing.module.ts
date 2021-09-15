import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CreateComputerComponent} from "./create-computer/create-computer.component";
import {EditComputerComponent} from "./edit-computer/edit-computer.component";

/*long-computer*/
const routes : Routes = [
  {path : 'create-computer',component : CreateComputerComponent},
  {path : 'update-computer/:id',component: EditComputerComponent}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class ComputerRoutingModule { }
