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

  getAllServices(): Observable<Services[]> {
    return this.http.get<Services[]>(this.API);
  }

  getAllUnit(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.API + '/units');
  }

  findById(id: number) {
    return this.http.get<Services>(this.API + '/services' + '/' + id);
  }

  update(id: number, service: Services): Observable<Services> {
    return this.http.put<Services>(this.API + '/services' + '/' + id, service);
  }

  create(service: Services): Observable<Services> {
    return this.http.post<Services>(this.API + '/services' + '/create', service);
  }

}
