import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Order} from '../../model/order/order';
import {Observable} from 'rxjs';
import {Services} from '../../model/service/services';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private API_URL_ORDER = 'http://localhost:8080/order';
  private API_URL_SERVICES = 'http://localhost:8080/services';
  public API_URL_CUSTOMERS = 'http://localhost:8080/customer';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public  http: HttpClient) {
  }

  getService(): Observable<Services[]> {
    return this.http.get<Services[]>(this.API_URL_SERVICES);
  }

  getByID(customerId): Observable<any>{
    return  this.http.get<any>(this.API_URL_CUSTOMERS + '/getCustomer/' + customerId);
  }


  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.API_URL_ORDER + '/create', order);
  }
}
