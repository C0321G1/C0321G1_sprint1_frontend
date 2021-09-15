import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../../../service/order/order.service';
import {Order} from '../../../model/order/order';
import {Router} from '@angular/router';


@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  createForm: FormGroup;
  public idCustomer: number;
  OrderObj: Order = new Order();

  constructor(private formBuilder: FormBuilder,
              private orderService: OrderService,
              private  router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.createForm = this.formBuilder.group({
      idCustomer: [this.idCustomer],
      listServiceRecordOrder: this.formBuilder.array([])
    });
  }

  createOrder() {
    if (this.createForm.valid) {
      this.OrderObj = Object.assign({}, this.createForm.value);
    }
    this.orderService.createOrder(this.OrderObj).subscribe(data => {
      this.router.navigateByUrl('');
    }, error => {
      console.log('Loi create' + error);
    });
  }
}
