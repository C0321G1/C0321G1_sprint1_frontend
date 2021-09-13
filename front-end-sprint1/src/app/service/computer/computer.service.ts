import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Computer} from '../../model/computer/computer';
import {ComputerType} from '../../model/computer/type-computer';
import {ComputerStatus} from '../../model/computer/status-computer';
import {ComputerManufacturer} from '../../model/computer/manufacturer-computer';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  private API_URL_COMPUTER = 'http://localhost:8080/computer';
  private API_URL_COMPUTER_TYPE = 'http://localhost:8080/computerType';
  private API_URL_COMPUTER_STATUS = 'http://localhost:8080/computerStatus';
  private API_URL_COMPUTER_MANUFACTURER = 'http://localhost:8080/computerManufacturer';
  private API_URL_COMPUTER_PAGE = 'http://localhost:8080/computerPage';

  constructor(private httpClient: HttpClient) { }

  getAllComputerPage(page: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_COMPUTER_PAGE + '?page=' + page);
  }

  getAllComputer() {
    return this.httpClient.get<Computer[]>(this.API_URL_COMPUTER);
  }

  getAllComputerType() {
    return this.httpClient.get<ComputerType[]>(this.API_URL_COMPUTER_TYPE);
  }

  getAllComputerStatus() {
    return this.httpClient.get<ComputerStatus[]>(this.API_URL_COMPUTER_STATUS);
  }

  getAllComputerManufacturer() {
    return this.httpClient.get<ComputerManufacturer[]>(this.API_URL_COMPUTER_MANUFACTURER);
  }

  getComputerById(computerId: any) {
    return this.httpClient.get<Computer[]>(this.API_URL_COMPUTER + '/' + computerId);
  }

  delete(idComputer: number) {
    return this.httpClient.delete<Computer>(this.API_URL_COMPUTER + '/' + idComputer);
  }
}

