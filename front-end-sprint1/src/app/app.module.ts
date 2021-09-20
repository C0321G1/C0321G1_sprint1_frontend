import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CustomerModule} from './module/customer/customer.module';
import {MessageModule} from './module/message/message.module';
import {MessageRoutingModule} from './module/message/message-routing.module';
import {DatePipe} from '@angular/common';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerModule,
    MessageModule,
    MessageRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
