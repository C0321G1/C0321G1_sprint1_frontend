import {Component, OnInit} from '@angular/core';
import {Game} from '../../../model/game/game';
import {GameService} from '../../../service/game/game.service';
import {GameDeleteDialogComponent} from '../game-delete-dialog/game-delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  name = '';
  gameType = '';

  constructor(private gameService: GameService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.gameService.getAllGame(this.name, this.gameType).subscribe(value => {
      this.games = value;
    });
  }

  delete(id: any): void {
    this.gameService.getById(id).subscribe(data => {
      const dialogRef = this.dialog.open(GameDeleteDialogComponent, {
        width: '500px',
        data: {game: data},
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
    // this.page = 1;
  }
}
