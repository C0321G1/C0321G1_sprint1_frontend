import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Game} from '../../model/game/game';
import {GameType} from '../../model/game/game-type';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public API_GAME = 'http://localhost:8080/game';
  public API_GAME_TYPE = 'http://localhost:8080/gameType';

  constructor(private http: HttpClient) {
  }

  getAllGame(): Observable<Game[]> {
    return this.http.get<Game[]>(this.API_GAME);
  }

  saveGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.API_GAME, game);
  }

  getAllGameType(): Observable<GameType[]> {
    return this.http.get<GameType[]>(this.API_GAME_TYPE);
  }

  findById(id: number): Observable<Game> {
    return this.http.get<Game>(this.API_GAME + '/' + id);
  }

  getById(id): Observable<Game[]> {
    return this.http.get<Game[]>(this.API_GAME + '/' + id).pipe();
  }

  updateGame(id: number, game: Game): Observable<Game> {
    return this.http.patch<Game>(this.API_GAME + '/' + id, game);
  }

  deleteGame(id: number): Observable<any> {
    return this.http.delete(this.API_GAME + '/' + id);
  }

  search(name: string): Observable<Game[]> {
    return this.http.get<Game[]>(this.API_GAME + '?name_like=' + name);
  }
}
