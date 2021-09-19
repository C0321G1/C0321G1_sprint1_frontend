import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Address} from '../../model/address/address';
import {Province} from '../../model/address/province';
import {District} from '../../model/address/district';
import {Commune} from '../../model/address/commune';


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private API_URL = 'http://localhost:8080/address';
  private API_URL_PROVINCE = 'http://localhost:8080/province';
  private API_URL_DISTRICT = 'http://localhost:8080/district';
  private API_URL_COMMUNE = 'http://localhost:8080/commune';

  constructor(private httpClient: HttpClient) {
  }

  getAddressList(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(this.API_URL);
  }

  getProvinceList(): Observable<Province[]> {
    return this.httpClient.get<Province[]>(this.API_URL_PROVINCE);
  }

  getDistrictList(): Observable<District[]> {
    return this.httpClient.get<District[]>(this.API_URL_DISTRICT);
  }

  getCommuneList(): Observable<Commune[]> {
    return this.httpClient.get<Commune[]>(this.API_URL_COMMUNE);
  }
}
