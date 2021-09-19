import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {OrderDetail} from '../../model/order/order-detail';

@Injectable({
  providedIn: 'root'
})

export class OrderDetailService {
  private API_URL_ORDER_DETAIL = 'http://localhost:8080/order-detail';
  httpOptions: any;

  constructor(public  http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Credentials': 'true'
    };
  }
  createOrderDetail(orderDetail: OrderDetail[], id: number): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(this.API_URL_ORDER_DETAIL + '/create-detail/' + id, {orderDetailDtoList: orderDetail});
  }
}
