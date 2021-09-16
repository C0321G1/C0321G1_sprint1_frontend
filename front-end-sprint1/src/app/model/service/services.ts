import {Unit} from './unit';

export interface Services {
  serviceId: number;
  code: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  flag: number;
  unit: Unit;
}
