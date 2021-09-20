import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Order} from "../../model/order-detail/order";


// huynh code
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private API = 'http://localhost:8080/order';

  constructor(public http: HttpClient) {
  }

  getAllOder(page: number): Observable<any> {
    return this.http.get<any>(this.API + '/list?page='+page);
  }

  getAllOderByIdCustomer( idCustomer: number,page :number): Observable<any> {
    return this.http.get<any>(this.API + '/' + idCustomer +'?page='+page)
  }

  confirmPayment(idOder: number): Observable<void> {
    // @ts-ignore
    return this.http.patch<void>(this.API + '/' + idOder);
  }

  getOrderById(idOrder: number): Observable<Order>{
    return this.http.get<Order>(this.API+'/getOrder/'+idOrder)
  }


}
