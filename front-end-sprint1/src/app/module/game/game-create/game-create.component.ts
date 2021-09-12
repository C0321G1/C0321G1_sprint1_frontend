import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../../app.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(private appComponent: AppComponent) {
  }

  ngOnInit(): void {
  }

  // onFileSelected($event: Event) {
  //
  //   this.appComponent.onFileSelected($event);
  // }
}
