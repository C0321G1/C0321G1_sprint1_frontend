import {Address} from '../address/address';
import {CustomerStatus} from './customer-status';
import {Gender} from './gender';

export interface Customer {
  customerId: number;
  code: string;
  account: Account;
  fullName: string;
  email: string;
  dateOfBirth: string;
  address: Address;
  phone: string;
  customerStatus: CustomerStatus;
  flag: number;
  gender: Gender;
}
