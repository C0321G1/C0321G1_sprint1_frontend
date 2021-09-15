import {Component, OnInit} from '@angular/core';
import {Order} from "../../../model/order-detail/order";
import {OrderService} from "../../../service/order/order.service";
import {OrderDetailService} from "../../../service/order-detail/order-detail.service";
import {OrderDetail} from "../../../model/order-detail/order-detail";
import {MatDialog} from "@angular/material/dialog";
import {OrderDetailListComponent} from "../order-detail-list/order-detail-list.component";

// huynh code
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public p = 0;
  public orderPage: Order[];
  po: Array<any> = [];

  listTotalMoney = [];
  orderDetailList: OrderDetail[]

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
    this.orderService.getAllOder(this.p).subscribe(value => {

      if (value == null) {
        this.orderPage = [];
      } else {
        this.orderPage = value.content;
        this.p = 0;
        for (let order of this.orderPage) {
          this.getTotalMoney(order.orderId)
        }
      }
      this.po = new Array<any>(value.totalPage);
      console.log(this.po.length);
    }, error => {
      console.log(error);
    });
  }

  first() {
    this.p = 0;
  }

  last() {
    this.p = this.po.length - 1;
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
    }
    this.p = this.p + 1;
    this.getAllOrderPage();
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
}
