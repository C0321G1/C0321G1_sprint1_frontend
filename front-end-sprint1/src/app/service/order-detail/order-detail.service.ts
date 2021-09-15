import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderDetail} from "../../model/order-detail/order-detail";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  private API = 'http://localhost:8080/order_detail';

  constructor(public http: HttpClient) {
  }

  getAllOderDetailByIdOder(idOder: number): Observable<any> {
    return this.http.get<any>(this.API + '/' + idOder);
  }
}
