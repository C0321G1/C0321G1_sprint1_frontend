import {Component, OnInit} from '@angular/core';
import {Gender} from '../../../../model/customer/gender';
import {Province} from '../../../../model/address/province';
import {CustomerService} from '../../../../service/customer/customer.service';
import {District} from '../../../../model/address/district';
import {Commune} from '../../../../model/address/commune';
import {CustomerStatus} from '../../../../model/customer/customer-status';
import {FormControl, FormGroup, FormGroupName, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  customerForm: FormGroup;
  genderList: Gender[] = [];
  provinceList: Province[] = [];
  districtList: District[] = [];
  communeList: Commune[] = [];
  statusList: CustomerStatus[] = [];
  constructor(private customerService: CustomerService,
              private router: Router,
              private toasts: ToastrService) {


    this.customerForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^0\\d{9,10}$')]),
      password: new FormControl('', [Validators.required]),
      genderId: new FormControl('', [Validators.required]),
      customerStatusId: new FormControl('', [Validators.required]),
      // addressId: new FormControl('', [Validators.required]),

      address: new FormGroup({
        provinceId: new FormControl('', [Validators.required]),
        districtId: new FormControl('', [Validators.required]),
        communeId: new FormControl('', [Validators.required])
      })
    });
  }

  ngOnInit(): void {
    this.createCustomer();
    this.getGenderList();
    this.getProvinceList();
    this.getDistrictList();
    this.getCommuneList();
    this.getStatusList();
  }

  createCustomer() {

    console.log(this.customerForm.value);
    this.customerService.saveCusDto(this.customerForm.value).subscribe(() => {
      this.toasts.success('Create new customer successfully !');
    });
  }

  getGenderList() {
    this.customerService.getAllGender().subscribe(data => {
      this.genderList = data;
      console.log(data);
    });
  }

  getProvinceList() {
    this.customerService.getAllProvince().subscribe(data => {
      this.provinceList = data;
      console.log(data);
    });
  }

  getDistrictList() {
    this.customerService.getAllDistrict().subscribe(data => {
      this.districtList = data;
      console.log(data);
    });
  }

  getCommuneList() {
    this.customerService.getAllCommune().subscribe(data => {
      this.communeList = data;
      console.log(data);
    });
  }

  getStatusList() {
    this.customerService.getAllCustomerStatus().subscribe(data => {
      this.statusList = data;
      console.log(data);
    });
  }

}
