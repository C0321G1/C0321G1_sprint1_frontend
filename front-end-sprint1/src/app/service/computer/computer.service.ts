import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Computer} from "../../model/computer/computer";
import {ToastrService} from "ngx-toastr";
import { Injectable } from '@angular/core';
import {ComputerType} from '../../model/computer/type-computer';
import {ComputerStatus} from '../../model/computer/status-computer';
import {ComputerManufacturer} from '../../model/computer/manufacturer-computer';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  public API: string = "http://localhost:8080"
  private API_URL_COMPUTER = 'http://localhost:8080/computer';
  private API_URL_COMPUTER_TYPE = 'http://localhost:8080/computerType';
  private API_URL_COMPUTER_STATUS = 'http://localhost:8080/computerStatus';
  private API_URL_COMPUTER_MANUFACTURER = 'http://localhost:8080/computerManufacturer';
  private API_URL_COMPUTER_PAGE = 'http://localhost:8080/computerPage';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient,
              private toast: ToastrService) {
  }
/*long-computer*/
  createComputerDTO(computerDTO: Computer): Observable<Computer> {
    return this.httpClient.post<Computer>(this.API + '/create-computer',
      JSON.stringify(computerDTO), this.httpOptions)
  };
  /*long-computer*/
  updateComputerDTO(id: number, computerDTO: Computer): Observable<Computer> {
    return this.httpClient.patch<Computer>(this.API + '/update-computer/' + id,
      JSON.stringify(computerDTO), this.httpOptions)
  }
  /*long-computer*/
  showMessageSuccess(message) {
    this.toast.success(message, "Notify: ");
  }
  /*long-computer*/
  showMessageErrors(message) {
    this.toast.error(message, "Notify: ");
  }

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

  getComputerById(computerId: any): Observable<Computer> {
    return this.httpClient.get<Computer>(this.API_URL_COMPUTER + '/' + computerId);
  }

  delete(idComputer: number) {
    return this.httpClient.delete<Computer>(this.API_URL_COMPUTER + '/' + idComputer);
  }

  searchComputer(computerId: string, location: string, computerType: string, computerStatus: string, startDateFrom: string,
                 startDateTo: string, page: number) {
    return this.httpClient.get<any>(this.API_URL_COMPUTER + '/searchComputer?computerId=' + computerId + '&location=' +
      location + '&computerType=' + computerType + '&computerStatus=' + computerStatus + '&startDateFrom=' + startDateFrom +
      '&startDateTo=' + startDateTo + '&page=' + page);
  }

}

