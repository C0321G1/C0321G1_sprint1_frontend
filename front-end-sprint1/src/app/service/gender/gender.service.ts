import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Province} from '../../model/address/province';
import {Gender} from '../../model/customer/gender';
// creator: vinhdn
const API_URL_COMMUNE = 'http://localhost:8080/gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private httpClient: HttpClient) {
  }

  // creator: vinhdn
  getGenderList(): Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(API_URL_COMMUNE);
  }
}
