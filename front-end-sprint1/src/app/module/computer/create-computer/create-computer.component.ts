import {Component, OnInit} from '@angular/core';
import {ComputerService} from "../../../service/computer/computer.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-computer',
  templateUrl: './create-computer.component.html',
  styleUrls: ['./create-computer.component.css']
})
export class CreateComputerComponent implements OnInit {
  formComputer: FormGroup;

  constructor(private computerService: ComputerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formComputer = new FormGroup({
      computerCode: new FormControl('', Validators.required),
      location: new FormControl('', [Validators.required]),
      startUsedDate: new FormControl('', [Validators.required]),
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

  create() {
    this.computerService.createComputerDTO(this.formComputer.value).subscribe(value => {
      this.router.navigateByUrl('create-computer')
        .then(value1 => this.computerService.showMessageSuccess("New added success!"))
    })
  }


}
