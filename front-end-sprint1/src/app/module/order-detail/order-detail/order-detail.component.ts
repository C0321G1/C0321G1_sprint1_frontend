import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Services} from '../../../model/service/services';
import {Router} from '@angular/router';
import {OrderDetail} from '../../../model/order/order-detail';
import {OrderDetailService} from '../../../service/order-detail/order-detail.service';
import {Order} from '../../../model/order/order';
import {OrderService} from '../../../service/order/order.service';
import {Customer} from '../../../model/customer/customer';
import {ServiceService} from '../../../service/service/service.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  private userName = 'Vu';
  createForm: FormGroup;
  services: Services[];
  order: Order[];
  OrderObj: OrderDetail = new OrderDetail();
  orderList: OrderDetail[] = [];
  customers: Customer;
  public service: Services;
  public changeType?: Services;
  public name = '';

  constructor(private formBuilder: FormBuilder,
              private  router: Router,
              private orderDetailService: OrderDetailService,
              private orderService: OrderService,
              private  servicesService: ServiceService
              // private  accountService: AcountServcies
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
    this.servicesService.getListServices().subscribe(data => {
      this.services = data;
      this.changeType = data[0];
    }, error => {
      console.log('Loi services:' + error);
    });
  }

  initForm() {
    this.createForm = this.formBuilder.group({
      services: ['', [Validators.required]],
      quantity: ['', [Validators.required, this.validateInterger]],
    });
  }
  validateInterger(abstractControl: AbstractControl) {
    return (abstractControl.value > 0 && abstractControl.value % 1 === 0) ? null : {checkInterger: true};
  }
  createOrder() {
    if (this.createForm.valid) {
      this.OrderObj = Object.assign({}, this.createForm.value);

      this.OrderObj.totalPrices = this.OrderObj.quantity * this.OrderObj.services.prices;
    }
    this.orderList.push(this.OrderObj);
    console.log(this.orderList);

  }

  Finish() {
    let order = new Order();
    order.customer = this.customers;
    this.orderService.createOrder(order).subscribe(data => {
      order = data;
      console.log(data);
      this.orderDetailService.createOrderDetail(this.orderList, order.orderId).subscribe();
    });
  }
}
