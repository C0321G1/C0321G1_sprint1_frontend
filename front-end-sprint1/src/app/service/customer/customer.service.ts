import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../../model/customer/customer';

const API_URL = 'http://localhost:8080/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) {
  }

  save(customer: Customer) {
    return this.httpClient.post(API_URL + '/create', customer);
  }

  // creator: vinhdn
  checkUsername(account: Account) {
    return this.httpClient.post(API_URL + '/checkUsername', account);
  }
}
