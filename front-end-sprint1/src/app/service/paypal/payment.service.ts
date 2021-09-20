import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {PayPalLink} from "../../model/paypal/PayPalLink";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private API_URL_PAYMENT = 'http://localhost:8080/pay';
  private API_URL_SUCCESS = 'http://localhost:8080/success';

  constructor(private httpClient: HttpClient) {

  }
  payment(price: number): Observable<PayPalLink> {
    return this.httpClient.get<PayPalLink>(this.API_URL_PAYMENT+'?price='+price);
  }
  successPayment(paymentId: string,PayerID: string): Observable<any>{
    return this.httpClient.get<any>(this.API_URL_SUCCESS+'?paymentId='+paymentId+'&PayerID='+PayerID)
  }
}
