import {Address} from '../address/address';
import {Gender} from '../customer/gender';

export interface Employee {
  employeeId: number;
  code: string;
  fullName: string;
  position: Position;
  gender: Gender;
  email: string;
  dateOfBirth: string;
  startWorkDate: string;
  address: Address;
  phone: string;
  account: Account;
  level: number;
  yearOfExp: number;
  flagDel: number;
  image: string;
}
