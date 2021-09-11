import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ServiceService} from '../../../service/service/service.service';
import {ToastrService} from 'ngx-toastr';
import {Services} from '../../../model/service/services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-services-create',
  templateUrl: './services-create.component.html',
  styleUrls: ['./services-create.component.css']
})
export class ServicesCreateComponent implements OnInit {
  createForm: FormGroup;
  servicesList: Services[] = [];
  code = 'SV-0001';
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
  }

  getInit() {
    this.createForm = new FormGroup({
      id: new FormControl(),
      code: new FormControl(this.code),
      name: new FormControl(),
      price: new FormControl(),
      quantity: new FormControl(),
      unit: new FormControl(),
      image: new FormControl()
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
}
