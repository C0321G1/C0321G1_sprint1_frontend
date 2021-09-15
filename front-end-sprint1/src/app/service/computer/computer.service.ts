import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Computer} from "../../model/computer/computer";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  public API: string = "http://localhost:8080"
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

}
