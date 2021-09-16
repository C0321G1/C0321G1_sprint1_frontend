import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Services} from '../../model/service/services';
import {HttpClient} from '@angular/common/http';
import {OrderDetail} from '../../model/order/order-detail';
import {Order} from '../../model/order/order';

@Injectable({
  providedIn: 'root'
})

export class OrderDetailService {
  private API_URL_ORDER_DETAIL = 'http://localhost:8080/order_detail';
  private API_URL_SERVICES = 'http://localhost:8080/services';
  private API_URL_ORDER = 'http://localhost:8080/order';

  constructor(public  http: HttpClient) {
  }

  getService(): Observable<Services[]> {
    return this.http.get<Services[]>(this.API_URL_SERVICES);
  }

  getOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(this.API_URL_ORDER);
  }

  createOrderDetail(orderDetail: OrderDetail[], id: number): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(this.API_URL_ORDER_DETAIL + '/create-detail/' + id, orderDetail);
  }
}
