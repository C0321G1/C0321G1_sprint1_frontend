import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Services} from '../../../model/service/services';
import {Router} from '@angular/router';
import {OrderDetail} from '../../../model/order/order-detail';
import {OrderDetailService} from '../../../service/order-detail/order-detail.service';
import {Order} from '../../../model/order/order';
import {OrderService} from '../../../service/order/order.service';
import {Customer} from '../../../model/customer/customer';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  private userName = 'Vu';
  createForm: FormGroup;
  services: Services[];
  orders: Order[];
  OrderObj: OrderDetail = new OrderDetail();
  orderList: OrderDetail[];
  customers: Customer;
  public changeType;

  constructor(private formBuilder: FormBuilder,
              private  router: Router,
              private orderDetailService: OrderDetailService,
              private orderService: OrderService,
              //private  accountService: AcountServcies
               ) {
    // this.accountService.findByUserName(this.userName).subscribe(data => {
    //   this.customers = data;
    // });
  }

  ngOnInit(): void {
    this.initData();
    this.initForm();
  }

  initData() {
    this.orderDetailService.getService().subscribe(data => {
      this.services = data;
    }, error => {
      console.log('Loi services:' + error);
    });
    this.orderDetailService.getOrder().subscribe(data => {
      this.orders = data;
    }, error => {
      console.log('Loi order' + error);
    });
  }

  initForm() {
    this.createForm = this.formBuilder.group({
      servicesName: ['', [Validators.required]],
      servicesUnit: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      prices: ['', [Validators.required]]
    });
  }

  createOrder() {
    if (this.createForm.valid) {
      this.OrderObj = Object.assign({}, this.createForm.value);
      this.OrderObj.totalPrices = this.OrderObj.prices * this.OrderObj.quantity;
    }
    this.orderList.push(this.OrderObj);
  }

  Finish() {
    let order = new Order();
    order.customer = this.customers;
    this.orderService.createOrder(order).subscribe(data => {
      order = data;
      this.orderDetailService.createOrderDetail(this.orderList, order.orderId).subscribe();
    });
    this.router.navigateByUrl('/list');
  }
}
