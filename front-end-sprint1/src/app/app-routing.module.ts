import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'services',
    loadChildren: () => import('./module/service/service.module').then(module => module.ServiceModule)

const routes: Routes = [
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
