import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./module/account/account.module').then(module => module.AccountModule)
  },
  {
    path: 'guest-homepage',
    loadChildren: () => import ('./module/client/client.module').then(module => module.ClientModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./module/service/service.module').then(module => module.ServiceModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
