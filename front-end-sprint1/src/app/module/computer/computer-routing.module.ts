
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CreateComputerComponent} from "./create-computer/create-computer.component";
import {EditComputerComponent} from "./edit-computer/edit-computer.component";
import {ComputerListComponent} from "./computer-list/computer-list.component";

/*long-computer*/
const routes : Routes = [
  {path : 'create-computer',component : CreateComputerComponent},
  {path : 'update-computer/:id',component: EditComputerComponent},
  {
    path: 'computer-list',
    component: ComputerListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComputerRoutingModule {
}
