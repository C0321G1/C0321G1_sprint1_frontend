import {TypeComputer} from './type-computer';
import {ManufacturerComputer} from './manufacturer-computer';
import {StatusComputer} from './status-computer';

export interface Computer {
  id: number;
  idComputer: string;
  location: string;
  startUsedDate: string;
  configuration: string;
  warrantyPeriod: string;
  flagDelete: number;
  typeComputer: TypeComputer;
  manufacturerComputer: ManufacturerComputer;
  statusComputer: StatusComputer;
}
