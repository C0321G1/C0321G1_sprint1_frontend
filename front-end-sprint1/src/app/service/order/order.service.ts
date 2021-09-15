import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private API = 'http://localhost:8080/order';

  constructor(public http: HttpClient) {
  }

  getAllOder(page: number): Observable<any> {
    return this.http.get<any>(this.API + '/list');
  }

  getAllOderByIdCustomer(page: number, idCustomer: number): Observable<any> {
    return this.http.get<any>(this.API + '?idCustomer=' + idCustomer + '&page=' + page)
  }
  confirmPayment(idOder: number):Observable<void>{
   // @ts-ignore
    return  this.http.patch<void>(this.API+'/'+idOder);
  }
}
