import {Unit} from './unit';

export interface Services {
  servicesId: number;
  prices: number;
  code: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  flag: number;
  unit: Unit;
}
