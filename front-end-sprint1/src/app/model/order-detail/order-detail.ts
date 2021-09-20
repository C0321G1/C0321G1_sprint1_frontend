import {Order} from './order';
import {Services} from '../service/services';
import {Unit} from "../service/unit";


export interface OrderDetail {
  orderDetailId: number;
  order: Order;
  quantity: number;
  totalPrices: number;
  services: Services;
}
