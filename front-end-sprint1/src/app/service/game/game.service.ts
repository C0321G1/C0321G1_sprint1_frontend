import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Game} from '../../model/game/game';
import {GameType} from '../../model/game/game-type';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public API_GAME = 'http://localhost:8080/game/api';
  public API_GAME_TYPE = 'http://localhost:8080/gameType/api';

  constructor(private http: HttpClient) {
  }

// Creator: Thúy
  getAllGame(): Observable<Game[]> {
    return this.http.get<Game[]>(this.API_GAME);
  }

  getAllGameType(): Observable<GameType[]> {
    return this.http.get<GameType[]>(this.API_GAME_TYPE);
  }

  deleteGame(id: number): Observable<any> {
    return this.http.delete(this.API_GAME + '/' + id);
  }

  search(name: string): Observable<Game[]> {
    return this.http.get<Game[]>(this.API_GAME + '?name_like=' + name);
  }

  getById(id): Observable<Game[]> {
    return this.http.get<Game[]>(this.API_GAME + '/' + id).pipe();
  }

  // Creator: Nhung
  saveGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.API_GAME, game);
  }

  updateGame(id: number, game: Game): Observable<Game> {
    return this.http.patch<Game>(this.API_GAME + '/' + id, game);
  }
}
