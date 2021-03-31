import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GameDto} from '../model/game.dto';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {ResultDto} from '../model/result.dto';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {
  }

  initGame(): Observable<GameDto> {
    return this.http.get<GameDto>(`${environment.apiUrl}/games/init`).pipe(map(value => new GameDto(value)));
  }

  check(id: string, n: number): Observable<ResultDto> {
    return this.http.get<ResultDto>(`${environment.apiUrl}/games/${id}/check/${n}`).pipe(map(value => new ResultDto(value)));
  }
}
