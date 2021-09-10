import {Orders} from './orders';
import {Services} from '../service/services';
import {Unit} from '../service/unit';

export interface OrderDetail {
  orderDetailId: number;
  order: Orders;
  quantity: number;
  prices: number;
  totalPrices: number;
  service: Services;
  unit: Unit;
}
