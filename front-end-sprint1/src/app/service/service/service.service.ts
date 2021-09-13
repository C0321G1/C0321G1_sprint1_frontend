import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Unit} from '../../model/service/unit';
import {Services} from '../../model/service/services';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private API = 'http://localhost:8080';

  constructor(public http: HttpClient) {

  }

  getAllServices(name: string, page: number): Observable<any> {
    return this.http.get<any>(this.API + '/services?name=' + name + '&page=' + page);
  }

  searchNameCode(code: string, name: string, prices: string, page: number): Observable<any> {
    return this.http.get<any>(this.API + '/services/searchNameCodePrices?code=' + code + '&name=' + name
      + '&prices=' + prices + '&page=' + page);

  }

  getAllUnit(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.API + '/units');
  }

  deleteServices(id: number) {
    return this.http.get<Services>(this.API + '/services' + '/' + id);
  }

  findById(id: number) {
    return this.http.get<Services>(this.API + '/services' + '/' + id);
  }

  update(id: number, service: Services): Observable<Services> {
    return this.http.patch<Services>(this.API + '/services' + '/' + id, service);
  }

  create(service: Services): Observable<Services> {
    return this.http.post<Services>(this.API + '/services' + '/create', service);
  }

}
