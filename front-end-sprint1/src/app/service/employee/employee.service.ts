import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Province} from '../../model/address/province';

const API_POSITION = 'http://localhost:8080/position';
const API_PROVINCE = 'http://localhost:8080/province';
const API_EMPLOYEE = 'http://localhost:8080/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  // khue create method get list position
  getAllPosition(): Observable<Position[]> {
    return this.http.get<Position[]>(API_POSITION);
  }

  // khue create method get list province
  getAllProvince(): Observable<Province[]> {
    return this.http.get<Province[]>(API_PROVINCE);
  }

  // khue create method get list employee
  getAllEmployee(page: number): Observable<any> {
    return this.http.get<any>(API_EMPLOYEE + '?page=' + page);
  }

  // khue create method delete employee
  deleteEmployee(id: number) {
    return this.http.delete<any>(API_EMPLOYEE + '/' + id);
  }

  // khue create method search employee
  // tslint:disable-next-line:max-line-length
  searchEmployee(page: number, employeeId: string, dateBirthFrom: string, dateBirthTo: string, dateWorkFrom: string, dateWorkTo: string, position: string, province: string ): Observable<any> {
    return this.http.get<any>(API_EMPLOYEE + '/search' + '?page=' + page + '&employeeId=' + employeeId
    + '&dateBirthFrom=' + dateBirthFrom + '&dateBirthTo=' + dateBirthTo + '&dateWorkFrom=' + dateWorkFrom
    + '&dateWorkTo=' + dateWorkTo + '&position=' + position + '&province=' + province );
  }
}
