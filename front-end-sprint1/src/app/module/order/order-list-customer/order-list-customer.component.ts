import { Component, OnInit } from '@angular/core';
import {Order} from "../../../model/order-detail/order";
import {OrderDetail} from "../../../model/order-detail/order-detail";
import {OrderService} from "../../../service/order/order.service";
import {OrderDetailService} from "../../../service/order-detail/order-detail.service";
import {MatDialog} from "@angular/material/dialog";
import {OrderDetailListComponent} from "../order-detail-list/order-detail-list.component";
import {OrderChoosePaymentComponent} from "../order-choose-payment/order-choose-payment.component";

@Component({
  selector: 'app-order-list-customer',
  templateUrl: './order-list-customer.component.html',
  styleUrls: ['./order-list-customer.component.css']
})
// huynh code
export class OrderListCustomerComponent implements OnInit {
  public p = 0;
  orderPage: Order[]=[];
  po: Array<any> = [];

  listTotalMoney = [];
  orderDetailList: OrderDetail[]
  message: string;

  constructor(private orderService: OrderService,
              private orderDetailService: OrderDetailService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getAllOrderPage();
  }

  getTotalMoney(idOrder: number) {
    let totalMoney = 0;
    this.orderDetailService.getAllOderDetailByIdOder(idOrder).subscribe(value => {
      this.orderDetailList = value;
      for (let orderDetail of this.orderDetailList) {
        totalMoney += orderDetail.totalPrices;
      }
      this.listTotalMoney.push(totalMoney);
    })
  }

  getAllOrderPage() {
    this.orderService.getAllOderByIdCustomer(1,this.p).subscribe(value => {

      if (value == null) {
        this.orderPage = [];
        this.message = 'Bạn chưa có dịch vụ nào'
      } else {
        this.orderPage = value.content;
        this.po = new Array<any>(value.totalPages);
        console.log(this.orderPage)
        for (let order of this.orderPage) {
          this.getTotalMoney(order.orderId)
        }
      }
    }, error => {

    });
  }

  first() {
    this.p = 0;
    this.getAllOrderPage()
  }

  last() {
    this.p = this.po.length - 1;
    this.getAllOrderPage()
  }

  previous() {
    if (this.p === 0) {
      this.p = 1;
    }
    this.p = this.p - 1;
    this.getAllOrderPage();
  }

  next() {
    if (this.p > this.po.length - 2) {
      this.p = this.po.length - 1;
      this.getAllOrderPage();
    }else {
      this.p = this.p + 1;
      this.getAllOrderPage();
    }
  }

  openDialog(id: any) {
    this.orderDetailService.getAllOderDetailByIdOder(id).subscribe(data => {
      const dialogRef = this.dialog.open(OrderDetailListComponent, {
        data: {oderDetailList: data},
        width: '700px',
        height:'auto',
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit();
      });
    });
  }

  openDialogConfirmPayment(orderId: number) {
    this.orderService.getOrderById(orderId).subscribe(data => {
      const dialogRef = this.dialog.open(OrderChoosePaymentComponent, {
        data: {order: data},
        width: '500px',
        height:'auto',
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit();
      });
    });
  }

}
