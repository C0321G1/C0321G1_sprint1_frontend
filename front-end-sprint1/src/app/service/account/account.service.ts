import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Province} from '../../model/address/province';
import {Account} from '../../model/account/account';
import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms';
import {map} from 'rxjs/operators';
// creator: vinhdn
const API_URL = 'http://localhost:8080/account';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) {
  }
  // creator: vinhdn
  getAccountList(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(API_URL + '/list');
  }
}
