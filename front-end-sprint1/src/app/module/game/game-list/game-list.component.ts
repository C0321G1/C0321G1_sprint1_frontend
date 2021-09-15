import {Component, OnInit} from '@angular/core';
import {Game} from '../../../model/game/game';
import {GameService} from '../../../service/game/game.service';
import {GameDeleteDialogComponent} from '../game-delete-dialog/game-delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {concat} from 'rxjs';
import {GameType} from '../../../model/game/game-type';
import {GameTypeService} from '../../../service/game/gameType/game-type.service';
import {FormControl, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  gameTypes: GameType[] = [];
  name = '';
  gameType = '';
  totalPage: number;
  p = 0;
  ps: Array<any> = [];
  searchPageInput: any;
  topGame: Game[] = [];
  top1: string;
  top2: string;
  top3: string;
  gameSearch: FormGroup;

  constructor(private gameService: GameService, private dialog: MatDialog, private gameTypeService: GameTypeService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    // this.page = 0;
    this.getAll();
    this.getTopGame();
    this.getAllGameType();
    this.gameSearch = new FormGroup({
      nameGame: new FormControl(''),
      gameType: new FormControl('')
    });
  }

  getAll() {
    this.gameService.getAllGamePage(this.p).subscribe(value => {
      this.games = value.content;
      this.ps = new Array<any>(value.totalPages);
    });
  }

  getTopGame() {
    this.gameService.getTopGame().subscribe(value => {
      this.topGame = value;
      for (let i = 0; i <= this.topGame.length; i++) {
        this.top1 = this.topGame[0].image;
      }
      for (let i = 0; i <= this.topGame.length; i++) {
        this.top2 = this.topGame[1].image;
      }
      for (let i = 0; i <= this.topGame.length; i++) {
        this.top3 = this.topGame[2].image;
      }
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

  searchGame(page: number) {
    console.log(this.gameSearch.value);
    this.gameService.searchGame(page, this.gameSearch.value.nameGame, this.gameSearch.value.gameType).subscribe(value => {
      this.games = value.content;
    }, error => {
      this.toast.error('No game', 'search game');
    });
  }

  nextPage() {
    this.p = this.p + 1;
    this.getAll();
  }

  previousPage() {
    this.p = this.p - 1;
    this.getAll();
  }

  lastPage() {
    this.p = this.ps.length - 1;
    this.getAll();
  }

  firstPage() {
    this.p = 0;
    this.getAll();
  }

  searchPage() {
    this.p = Number(this.searchPageInput) - 1;
    this.getAll();
  }

  getAllGameType() {
    this.gameTypeService.getAllGameType().subscribe(value => {
      this.gameTypes = value;
      console.log(value);
    });
  }
}
