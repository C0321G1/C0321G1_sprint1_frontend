import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServiceService} from '../../../service/service/service.service';
import {ToastrService} from 'ngx-toastr';
import {Services} from '../../../model/service/services';
import {Router} from '@angular/router';
import {Unit} from '../../../model/service/unit';

@Component({
  selector: 'app-services-create',
  templateUrl: './services-create.component.html',
  styleUrls: ['./services-create.component.css']
})
export class ServicesCreateComponent implements OnInit {
  createForm: FormGroup;
  servicesList: Services[] = [];
  unitList: Unit[] = [];
  code = '';
  lastId: number;

  constructor(private service: ServiceService,
              private toast: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getData();
    this.getInit();
  }

  getData() {
    this.service.getAllServices().subscribe(data => {
      this.servicesList = data;
      this.lastId = this.servicesList[this.servicesList.length - 1].serviceId;
      if (this.lastId < 10) {
        this.code = 'SV-000' + this.lastId;
      } else if (this.lastId < 100) {
        this.code = 'SV-00' + this.lastId;
      } else if (this.lastId < 1000) {
        this.code = 'SV-0' + this.lastId;
      } else {
        this.code = 'SV-' + this.lastId;
      }

    });
    this.service.getAllUnit().subscribe(data => {
      this.unitList = data;
    });
  }

  getInit() {
    this.createForm = new FormGroup({
      id: new FormControl(),
      code: new FormControl(this.code),
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(1000)]),
      quantity: new FormControl('', [Validators.required, this.validateInterger]),
      unit: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  create() {
    const service = this.createForm.value;
    this.service.create(service).subscribe(() => {
      this.router.navigateByUrl('');
      this.toast.success('Tạo mới dịch vụ thành công', 'Thông Báo');
    }, error => {
      this.toast.error('Tạo mới thất bại', 'Cảnh Báo');
    });

  }

  validateInterger(abstractControl: AbstractControl) {
    return (abstractControl.value > 0 && abstractControl.value % 1 === 0) ? null : {checkInterger: true};
  }
}
