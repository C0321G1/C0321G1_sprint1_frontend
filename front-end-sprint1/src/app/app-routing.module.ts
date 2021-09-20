import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'services',
    loadChildren: () => import('./module/service/service.module').then(module => module.ServiceModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./module/order/order.module').then(module => module.OrderModule)
  },
  {
    path: 'order-detail',
    loadChildren: () => import('./module/order-detail/order-detail.module').then(module => module.OrderDetailModule)
  },

  {
    path: 'statistic',
    loadChildren: () => import ('./module/statistic/statistic.module').then(value => value.StatisticModule)

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
