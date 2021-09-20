import {Customer} from '../customer/customer';

export interface Order {
  orderId: number;
  customer: Customer;
  status:number;
}
