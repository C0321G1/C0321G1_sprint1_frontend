import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesCreateComponent } from './services-create/services-create.component';
import { ServicesEditComponent } from './services-edit/services-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ServiceRoutingModule} from './service-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';



@NgModule({
  declarations: [
    ServicesCreateComponent,
    ServicesEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ServiceRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ]
})
export class ServiceModule { }
