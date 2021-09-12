import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameType} from "../../../model/game/game-type";

@Injectable({
  providedIn: 'root'
})
export class GameTypeService {
  public API_GAME_TYPE = 'http://localhost:8080/gameType/api';

  constructor(private http: HttpClient) {
  }

  getAllGameType(): Observable<GameType[]> {
    return this.http.get<GameType[]>(this.API_GAME_TYPE);
  }
}
