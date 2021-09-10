import {Address} from '../address/address';

export interface Employee {
  employeeId: number;
  code: string;
  fullName: string;
  position: Position;
  email: string;
  dateOfBirth: string;
  startWorkDate: string;
  address: Address;
  phone: string;
  account: Account;
  level: number;
  yearOfExp: number;
  flagDel: number;
}
