import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Gender} from '../../../../model/customer/gender';
import {Province} from '../../../../model/address/province';
import {District} from '../../../../model/address/district';
import {Commune} from '../../../../model/address/commune';
import {CustomerStatus} from '../../../../model/customer/customerStatus';
import {CustomerService} from '../../../../service/customer/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {CusDTO} from '../../../../model/dto/CusDTO';
import {Customer} from '../../../../model/customer/customer';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerEditForm: FormGroup;
  genderList: Gender[] = [];
  provinceList: Province[] = [];
  districtList: District[] = [];
  communeList: Commune[] = [];
  statusList: CustomerStatus[] = [];
  id: number = 1;


  constructor(private customerService: CustomerService,
              private router: Router,
              private toasts: ToastrService,
              private titleService: Title,
              private activatedRoute: ActivatedRoute,) {
    // this.id = Number(this.activatedRoute.snapshot.params.id);
    this.titleService.setTitle('Edit Customer');
    this.customerEditForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', [Validators.required, this.checkDateOfBirth]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^0\\d{9,10}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9]{6,}')]),
      genderId: new FormControl('', [Validators.required]),
      customerStatusId: new FormControl('', [Validators.required]),

      address: new FormGroup({
        province: new FormControl('', [Validators.required]),
        district: new FormControl('', [Validators.required]),
        commune: new FormControl('', [Validators.required])
      })
    });
  }

  ngOnInit(): void {
    this.getCustomerById();
    this.getGenderList();
    this.getProvinceList();
    this.getDistrictList();
    this.getCommuneList();
    this.getStatusList();

  }

  editCustomer() {
    console.log(this.customerEditForm.value);
    this.customerService.updateCusDto(this.customerEditForm.value).subscribe(() => {
      this.toasts.success('Update new customer successfully !');
    });
  }


  getCustomerById() {
    console.log('this.id' + this.id);
    this.customerService.findByIdCustomer(this.id).subscribe(data => {
      this.customerEditForm.patchValue(data);
      console.log('data' + data);
      }, error => {
      console.log("GetInfoCustomer"+ error+ "BackEnd" );
    });
  }

  getGenderList() {
    this.customerService.getAllGender().subscribe(data => {
      this.genderList = data;
    });
  }

  getProvinceList() {
    this.customerService.getAllProvince().subscribe(data => {
      this.provinceList = data;
    });
  }

  getDistrictList() {
    this.customerService.getAllDistrict().subscribe(data => {
      this.districtList = data;
    });
  }

  getCommuneList() {
    this.customerService.getAllCommune().subscribe(data => {
      this.communeList = data;

    });
  }

  getStatusList() {
    this.customerService.getAllCustomerStatus().subscribe(data => {
      this.statusList = data;
    });
  }

  checkDateOfBirth(data: AbstractControl): any {
    const dateOfBirth = data.value;
    const birthOfYear = Number(dateOfBirth.substr(0, 4));
    const currentYear = new Date().getFullYear();
    return currentYear - birthOfYear >= 18 ? null : {invalidAge: true};
  }

}

