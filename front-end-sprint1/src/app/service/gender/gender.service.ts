import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Gender} from '../../model/customer/gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private API_URL = 'http://localhost:8080/gender';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Gender[]> {
    return this.http.get<Gender[]>(this.API_URL);
  }
}
