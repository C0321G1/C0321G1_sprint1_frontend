import {Address} from '../address/address';
import {CustomerStatus} from './customerStatus';
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
