import {Address} from '../address/address';

export interface CusDTO {
  customerId: number;
  fullName: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  address: Address;
  genderId:number;
  customerStatusId: number;
  password: string;
  username: string;
  flag:number;
}
