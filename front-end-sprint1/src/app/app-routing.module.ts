import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'services',
    loadChildren: () => import('./module/service/service.module').then(module => module.ServiceModule)
  },
   {
    path: 'order',
    loadChildren: () => import('./module/order/order.module').then(module => module.OrderModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
