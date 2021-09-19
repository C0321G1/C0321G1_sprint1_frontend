import {Address} from '../address/address';
import {CustomerStatus} from './customerStatus';
import {Gender} from './gender';

export interface Customer {
  customerId: number;
  email: string;
  code: string;
  dateOfBirth: string;
  fullName: string;
  flag: number;
  phone: string;
  address: Address;
  customerStatus: CustomerStatus;
  account: Account;
  gender: Gender;
}
