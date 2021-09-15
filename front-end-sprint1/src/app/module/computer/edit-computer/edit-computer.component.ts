import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ComputerService} from "../../../service/computer/computer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit-computer.component.html',
  styleUrls: ['./edit-computer.component.css']
})
export class EditComputerComponent implements OnInit {
  id: number;
  formComputer: FormGroup;

  constructor(private computerService: ComputerService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.id = Number(activatedRoute.snapshot.params.id);
    computerService.getComputerById(this.id).subscribe(value => {
      this.formComputer.patchValue(value);
    })
  }

  ngOnInit(): void {
    this.formComputer = new FormGroup({
      computerCode: new FormControl('',
        [Validators.required, Validators.pattern('^CP[0-9]{4}$')]),
      location: new FormControl('', [Validators.required,
        Validators.pattern('^(A[0-9]{4}|B[0-9]{4}|C[0-9]{4}|D[0-9]{4})$')]),
      startUsedDate: new FormControl('', [Validators.required, validateStartUsedDate]),
      configuration: new FormControl('', [Validators.required]),
      warrantyPeriod: new FormControl('', [Validators.required]),
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

  upDate() {
    this.computerService.updateComputerDTO(this.id,this.formComputer.value).subscribe(value => {
      this.router.navigateByUrl('update-computer/'+this.id)
        .then(value => this.computerService.showMessageSuccess("Update success!"))
    },error => {
      this.router.navigateByUrl('update-computer/'+this.id)
        .then(value1 => this.computerService.showMessageErrors("Not success! Please enter again!"))
    })
  }

  reset(){
    this.computerService.getComputerById(this.id).subscribe(value => {
      this.formComputer.patchValue(value);
    })
    this.computerService.showMessageSuccess("Reset success")
  }


}

function validateStartUsedDate(fc: FormControl): any {
  console.log(fc.value.substr(8, 10));
  console.log(new Date(Date.now()).getDate())
  return Number(fc.value.substr(8, 10)) > new Date(Date.now()).getDate()
    ? {dateStart: true} : null;

}
