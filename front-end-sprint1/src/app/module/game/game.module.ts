import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameEditComponent} from './game-edit/game-edit.component';
import {GameCreateComponent} from './game-create/game-create.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {GameRoutingModule} from './game-routing.module';
import {GameListComponent} from './game-list/game-list.component';
import {GameDeleteDialogComponent} from './game-delete-dialog/game-delete-dialog.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [GameEditComponent, GameCreateComponent, GameListComponent, GameDeleteDialogComponent],
  exports: [
    GameCreateComponent,
    GameEditComponent,
    GameListComponent,
    GameDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    GameRoutingModule,
    CKEditorModule,
    HttpClientModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ]
})
export class GameModule {
}
