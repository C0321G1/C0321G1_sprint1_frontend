import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../../model/order/order';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private API_URL_ORDER = 'http://localhost:8080/order';
  constructor(public  http: HttpClient) {
  }
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.API_URL_ORDER + '/create', order);
  }
}
