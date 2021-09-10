import {Customer} from '../customer/customer';

export interface Orders {
  orderId: number;
  customer: Customer;
}
