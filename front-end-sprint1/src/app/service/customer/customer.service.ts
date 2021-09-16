import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Gender} from '../../model/customer/gender';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Province} from '../../model/address/province';
import {District} from '../../model/address/district';
import {Commune} from '../../model/address/commune';
import {CustomerStatus} from '../../model/customer/customer-status';
import {CusDTO} from '../../model/dto/CusDTO';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  API_URL: string = 'http://localhost:8080/customer';
  httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Credentials': 'true'
    };
  }

  getAllGender(): Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(this.API_URL + '/gender');
  }

  getAllProvince(): Observable<Province[]> {
    return this.httpClient.get<Province[]>(this.API_URL + '/province');
  }

  getAllDistrict(): Observable<District[]> {
    return this.httpClient.get<District[]>(this.API_URL + '/district');
  }

  getAllCommune(): Observable<Commune[]> {
    return this.httpClient.get<Commune[]>(this.API_URL + '/commune');
  }

  getAllCustomerStatus(): Observable<CustomerStatus[]> {
    return this.httpClient.get<CustomerStatus[]>(this.API_URL + '/customerStatus');
  }

  saveCusDto(cusDTO: CusDTO): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + '/create',cusDTO,this.httpOptions);
  }
}
