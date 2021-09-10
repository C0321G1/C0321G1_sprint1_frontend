import {Address} from "../address/address";
import {CustomerStatus} from "./customer-status";

export interface Customer {
  customerId: number;
  code: string;
  account: Account;
  fullName: string;
  email: string;
  dateOfBirth: string;
  address: Address;
  phone: string;
  status: CustomerStatus;
  flag: number;
}
