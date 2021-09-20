import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderService} from "../../../service/order/order.service";
import {OrderDetailService} from "../../../service/order-detail/order-detail.service";
import {Router} from "@angular/router";
import {Order} from "../../../model/order-detail/order";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.css']
})
// huynh code
export class OrderPaymentComponent implements OnInit {
  orderId:number;
  nameCustomer:string;
  totalMoneys: number;
  orderDetailList =[];
  order:Order;
  constructor(public dialogRef: MatDialogRef<OrderPaymentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public orderService: OrderService ,
              public orderDetailService:OrderDetailService,
              public router:Router,
              private toast: ToastrService,) { }

  ngOnInit(): void {
    this.orderId = this.data.order.orderId;
    this.nameCustomer = this.data.order.customer.fullName;
   this.getTotalMoney(this.data.order.orderId);
   this.order=this.data.order;
  }

  close() {
    this.dialogRef.close();
  }

  confirm() {
    this.orderService.confirmPayment(this.orderId).subscribe(()=>{
      this.toast.success('thanh toán thành công ');
      this.dialogRef.close();
      this.router.navigateByUrl('/order/list')
    })
  }

  getTotalMoney(idOrder: number) {
    let totalMoney = 0;
    this.orderDetailService.getAllOderDetailByIdOder(idOrder).subscribe(value => {
      this.orderDetailList = value;
      for (let orderDetail of this.orderDetailList) {
        totalMoney += orderDetail.totalPrices;
      }
      this.totalMoneys=totalMoney
    })
  }
}
