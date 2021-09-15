import {Order} from './order';
import {Services} from '../service/services';

export class OrderDetail {
  id: number;
  order: Order;
  quantity: number;
  prices: number;
  totalPrices: number;
  service: Services;
}
