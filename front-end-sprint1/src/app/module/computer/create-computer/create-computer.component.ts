import {Component, OnInit} from '@angular/core';
import {ComputerService} from "../../../service/computer/computer.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Computer} from "../../../model/computer/computer";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-create-computer',
  templateUrl: './create-computer.component.html',
  styleUrls: ['./create-computer.component.css']
})
export class CreateComputerComponent implements OnInit {
  formComputer: FormGroup;


  constructor(private computerService: ComputerService,
              private router: Router,
              private title: Title) {
    this.title.setTitle('Computer Create');
  }

  ngOnInit(): void {
    this.formComputer = new FormGroup({
      computerCode: new FormControl('',
        [Validators.required, Validators.pattern('^CP[0-9]{4}$')]),
      location: new FormControl('', [Validators.required,
        Validators.pattern('^(A[0-9]{4}|B[0-9]{4}|C[0-9]{4}|D[0-9]{4})$')]),
      startUsedDate: new FormControl('', [Validators.required, validateStartUsedDate]),
      configuration: new FormControl('', [Validators.required,Validators.maxLength(35)]),
      warrantyPeriod: new FormControl('', [Validators.required,Validators.maxLength(20)]),
      flagDelete: new FormControl(0),
      computerType: new FormGroup({
        name: new FormControl('', [Validators.required])
      }),
      computerManufacturer: new FormGroup({
        name: new FormControl('', [Validators.required])
      }),
      computerStatus: new FormGroup({
        name: new FormControl('', [Validators.required])
      })
    })
  }

  create() {
    this.computerService.createComputerDTO(this.formComputer.value).subscribe(value => {
      this.router.navigateByUrl('create-computer')
        .then(value1 => this.computerService.showMessageSuccess("New added success!"))
    },error => {
      this.router.navigateByUrl('create-computer')
        .then(value1 => this.computerService.showMessageErrors("Not success! Please enter again!"))
    })
  };

  reset() {
    this.ngOnInit();
  }


}

function validateStartUsedDate(fc: FormControl): any {
  console.log(fc.value.substr(8, 10));
  console.log(new Date(Date.now()).getDate())
  return Number(fc.value.substr(8, 10)) > new Date(Date.now()).getDate()
    ? {dateStart: true} : null;
}
