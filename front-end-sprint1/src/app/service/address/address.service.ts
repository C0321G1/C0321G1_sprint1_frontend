import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Province} from '../../model/address/province';
import {Observable} from 'rxjs';
import {District} from '../../model/address/district';
import {Commune} from '../../model/address/commune';
// creator: vinhdn
const API_URL_PROVINCE = 'http://localhost:8080/address/province';
const API_URL_DISTRICT = 'http://localhost:8080/address/district';
const API_URL_COMMUNE = 'http://localhost:8080/address/commune';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) {
  }
  // creator: vinhdn
  getProvinceList(): Observable<Province[]> {
    return this.httpClient.get<Province[]>(API_URL_PROVINCE);
  }
  // creator: vinhdn
  getDistrictList(): Observable<District[]> {
    return this.httpClient.get<District[]>(API_URL_DISTRICT);
  }
  // creator: vinhdn
  getCommuneList(): Observable<Commune[]> {
    return this.httpClient.get<Commune[]>(API_URL_COMMUNE);
  }
}
