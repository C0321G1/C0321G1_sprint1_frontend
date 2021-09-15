import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComputerListComponent} from './computer-list/computer-list.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'computer-list',
    component: ComputerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComputerRoutingModule {
}
