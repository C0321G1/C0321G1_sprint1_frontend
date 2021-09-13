import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Unit} from '../../model/service/unit';
import {Services} from '../../model/service/services';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private API = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(public http: HttpClient) {

  }

  getAllServices(): Observable<Services[]> {
    return this.http.get<Services[]>(this.API, this.httpOptions);
  }

  getAllUnit(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.API + '/units', this.httpOptions);
  }

  findById(id: number) {
    return this.http.get<Services>(this.API + '/services' + '/' + id, this.httpOptions);
  }

  update(id: number, service: Services): Observable<Services> {
    return this.http.put<Services>(this.API + '/services' + '/' + id, service, this.httpOptions);
  }

  create(service: Services): Observable<Services> {
    return this.http.post<Services>(this.API + '/create', service, this.httpOptions);
  }

}
