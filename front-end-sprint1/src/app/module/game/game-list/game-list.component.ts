import {Component, OnInit} from '@angular/core';
import {Game} from '../../../model/game/game';
import {GameService} from '../../../service/game/game.service';
import {GameDeleteDialogComponent} from '../game-delete-dialog/game-delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {GameType} from '../../../model/game/game-type';
import {GameTypeService} from '../../../service/game/gameType/game-type.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {GameTrailerComponent} from '../game-trailer/game-trailer.component';
import {GameDetailComponent} from '../game-detail/game-detail.component';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  // Creator: Thúy
  games: Game[] = [];
  gameTypes: GameType[] = [];
  name = '';
  gameType = '';
  totalPage: number;
  page: number;
  searchPageInput: any;
  topGame: Game[] = [];
  top1: string;
  top2: string;
  top3: string;
  gameSearch: FormGroup;
  checkSearch: number;

  constructor(private gameService: GameService, private dialog: MatDialog, private gameTypeService: GameTypeService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.page = 0;
    this.checkSearch = 0;
    this.getAll();
    this.getTopGame();
    this.getAllGameType();
    this.gameSearch = new FormGroup({
      nameGame: new FormControl(''),
      gameType: new FormControl('')
    });
  }

  getAll() {
    this.gameService.getAllGamePage(this.page).subscribe(value => {
      this.games = value.content;
      this.totalPage = value.totalPages;
    });
  }

  getTopGame() {
    this.gameService.getTopGame().subscribe(value => {
      this.topGame = value;
      this.top1 = this.topGame[0].image;
      this.top2 = this.topGame[1].image;
      this.top3 = this.topGame[2].image;
    });
  }

  trailer(id: any): void {
    this.gameService.getById(id).subscribe(data => {
      const dialogRef = this.dialog.open(GameTrailerComponent, {
        width: '500px',
        height: '450px',
        data: {game: data},
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }

  detail(id: any): void {
    this.gameService.getById(id).subscribe(data => {
      const dialogRef = this.dialog.open(GameDetailComponent, {
        width: '500px',
        height: '450px',
        data: {game: data},
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }

  delete(id: any): void {
    this.gameService.getById(id).subscribe(data => {
      const dialogRef = this.dialog.open(GameDeleteDialogComponent, {
        width: '500px',
        height: '360px',
        data: {game: data},
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    }, error => {
      this.toast.success('Delete failed game.', 'Delete game');
    });
  }

  searchGame(page: number) {
    if (this.gameSearch.value.nameGame === '' && this.gameSearch.value.gameType === '') {
      this.toast.error('Please enter the field you want to search!', 'search game');
    } else {
      this.checkSearch = 1;
      this.gameService.searchGame(page, this.gameSearch.value.nameGame, this.gameSearch.value.gameType).subscribe(value => {
        this.games = value.content;
        this.totalPage = value.totalPages;
      }, error => {
        this.checkSearch = 0;
        this.toast.error('Game not found.', 'search game');
      });
    }
  }

  nextPage() {
    if (this.page < this.totalPage - 1) {
      this.page = this.page + 1;
    }
    if (this.checkSearch === 0) {
      this.getAll();
    } else {
      this.searchGame(this.page);
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page = this.page - 1;
    } else {
      this.page = 0;
    }
    if (this.checkSearch === 0) {
      this.getAll();
    } else {
      this.searchGame(this.page);
    }
  }

  lastPage() {
    this.page = this.totalPage - 1;
    if (this.checkSearch === 0) {
      this.getAll();
    } else {
      this.searchGame(this.page);
    }
  }

  firstPage() {
    this.page = 0;
    if (this.checkSearch === 0) {
      this.getAll();
    } else {
      this.searchGame(this.page);
    }
  }

  searchPage() {
    if (this.searchPageInput - 1 < this.totalPage && this.searchPageInput - 1 >= 0) {
      this.page = this.searchPageInput - 1;
      if (this.checkSearch === 0) {
        this.getAll();
      } else {
        this.searchGame(this.page);
      }
    } else {
      if (this.searchPageInput !== '') {
        this.toast.error('please enter page number!', 'search game');
      }
    }
  }

  getAllGameType() {
    this.gameTypeService.getAllGameType().subscribe(value => {
      this.gameTypes = value;
    });
  }

  setPage() {
    if (this.checkSearch === 1) {
      this.page = 0;
    }
  }

  reset() {
    this.gameSearch = new FormGroup({
      nameGame: new FormControl(''),
      gameType: new FormControl('')
    });
    this.checkSearch = 0;
    this.getAll();
  }
}
