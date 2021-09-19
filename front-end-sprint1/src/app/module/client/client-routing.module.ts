import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../account/login/login.component";
import {GuestHomepageComponent} from "./guest-homepage/guest-homepage.component";
import {AuthGuard} from "../account/auth.guard";

const routes: Routes = [
  {path:'', component: GuestHomepageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
