import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StatisticByComputer} from '../../model/statistic/statistic-by-computer';
import {StatisticByMonth} from '../../model/statistic/statistic-by-month';
import {StatisticByAccount} from '../../model/statistic/statistic-by-account';

@Injectable({
  providedIn: 'root'
})
// Create by HauHP
export class StatisticService {
  API_URL_COMPUTER = 'http://localhost:8080/statistic/by-computer';
  API_URL_MONTH = 'http://localhost:8080/statistic/by-month';
  API_URL_ACCOUNT = 'http://localhost:8080/statistic/by-account';

  constructor(private httpClient: HttpClient) {
  }

  getStatisticByComputer(startDate: string, endDate: string): Observable<StatisticByComputer[]> {
    return this.httpClient.get<StatisticByComputer[]>(this.API_URL_COMPUTER + '/' + startDate + '/' + endDate);
  }
  getStatisticByMonth(startDate: string, endDate: string): Observable<StatisticByMonth[]> {
    return this.httpClient.get<StatisticByMonth[]>(this.API_URL_MONTH + '/' + startDate + '/' + endDate);
  }
  getStatisticByAccount(startDate: string, endDate: string): Observable<StatisticByAccount[]> {
    return this.httpClient.get<StatisticByAccount[]>(this.API_URL_ACCOUNT + '/' + startDate + '/' + endDate);
  }
}
