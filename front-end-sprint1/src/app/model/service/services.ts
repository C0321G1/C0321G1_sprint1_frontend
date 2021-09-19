import {Unit} from './unit';

export interface Services {
  servicesId: number;
  code: string;
  name: string;
  prices: number;
  serviceId: number;
  price: number;
  quantity: number;
  image: string;
  flag: number;
  unit: Unit;
}
