import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../../app.component';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit {

  constructor(private appComponent: AppComponent) {
  }

  ngOnInit(): void {
  }

  // onFileSelected($event: Event) {
  //
  //   this.appComponent.onFileSelected($event);
  // }
}
