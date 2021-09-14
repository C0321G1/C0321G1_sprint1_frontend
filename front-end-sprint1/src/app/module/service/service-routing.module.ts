import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServicesCreateComponent} from './services-create/services-create.component';
import {ServicesEditComponent} from './services-edit/services-edit.component';
import {ServicesListComponent} from './services-list/services-list.component';


const routes: Routes = [
  {path: '', component: ServicesListComponent},
  {
    path: 'create',
    component: ServicesCreateComponent
  },
  {
    path: 'edit/:id',
    component: ServicesEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule {
}
