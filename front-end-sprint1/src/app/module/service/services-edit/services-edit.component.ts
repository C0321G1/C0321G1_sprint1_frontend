import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Unit} from '../../../model/service/unit';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ServiceService} from '../../../service/service/service.service';

@Component({
  selector: 'app-services-edit',
  templateUrl: './services-edit.component.html',
  styleUrls: ['./services-edit.component.css']
})
export class ServicesEditComponent implements OnInit {
  editForm: FormGroup;
  id: number;
  unitList: Unit[] = [];


  constructor(private service: ServiceService,
              private activatedRoute: ActivatedRoute,
              private route: Router,
              private toast: ToastrService) {
    this.id = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getData();
    this.initForm();
    this.getService();
  }

  getData() {
    this.service.getAllUnit().subscribe(data => {
      this.unitList = data;
    });
  }

  initForm() {
    this.editForm = new FormGroup({
      id: new FormControl(),
      code: new FormControl(''),
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(1000)]),
      quantity: new FormControl('', [Validators.required, this.validateInterger]),
      unit: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  getService() {
    this.service.findById(this.id).subscribe(data => {
      this.editForm.setValue(data);
    });
  }

  edit() {
    const service = this.editForm.value;
    this.service.update(this.id, service).subscribe(() => {
        this.route.navigateByUrl('');
        this.toast.success('Thay đổi thông tin thành công ', 'Thông báo');
      }, error => {
        this.toast.error('Thay đổi thất bại', 'Cảnh báo');
      }
    );


  }

  validateInterger(abstractControl: AbstractControl) {
    return (abstractControl.value > 0 && abstractControl.value % 1 === 0) ? null : {checkInterger: true};
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
