import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Game} from '../../model/game/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public API_GAME = 'http://localhost:8080/game/api';
  public API_TOP_GAME = 'http://localhost:8080/game/api/top';

  constructor(private http: HttpClient) {
  }

// Creator: Thúy
  getAllGamePage(page: number): Observable<any> {
    return this.http.get<any>(this.API_GAME + '?page=' + page);
  }

  getTopGame(): Observable<Game[]> {
    return this.http.get<Game[]>(this.API_TOP_GAME);
  }

  // getAllGame(): Observable<any> {
  //   return this.http.get<any>(this.API_GAME);
  // }

  searchGame(page: number, name: string, gameType: string): Observable<any> {
    return this.http.get<any>(this.API_GAME + '/search' + '?page=' + page + '&name=' + name
      + '&gameType=' + gameType);
  }
  // getAllComputerPage(page: number): Observable<any> {
  //   return this.httpClient.get<any>(this.API_URL_COMPUTER_PAGE + '?page=' + page);
  // }
//   getAllGame(name: string, gameType: string): Observable<Game[]> {
//     return this.http.get<Game[]>(this.API_GAME + '?name=' + name + '&' + 'gameType=' + gameType);
//   }

  deleteGame(id: number): Observable<any> {
    // @ts-ignore
    return this.http.patch<any>(this.API_GAME + '/delete/' + id);
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
