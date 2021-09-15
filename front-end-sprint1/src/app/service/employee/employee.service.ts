import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Position} from '../../model/employee/position';
import {Employee} from '../../model/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private API_URL = 'http://localhost:8080/employee';
  private API_URL_POSITION = 'http://localhost:8080/position';

  constructor(private http: HttpClient) { }

  getPositionList(): Observable<Position[]> {
    return this.http.get<Position[]>(this.API_URL_POSITION);
  }

  save(employee): Observable<Employee> {
    return this.http.post<Employee>(this.API_URL, employee);
  }

  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.API_URL + '/' + id);
  }

  edit(employee: any): Observable<Employee> {
    return this.http.patch<Employee>(this.API_URL, employee);
  }
}
