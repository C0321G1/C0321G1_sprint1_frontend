import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../../../service/customer/customer.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Gender} from '../../../model/customer/gender';
import {Province} from '../../../model/address/province';
import {District} from '../../../model/address/district';
import {Commune} from '../../../model/address/commune';
import {GenderService} from '../../../service/gender/gender.service';
import {AddressService} from '../../../service/address/address.service';
import {AccountService} from '../../../service/account/account.service';
import {Account} from '../../../model/account/account';

@Component({
  selector: 'app-customer-sign-up',
  templateUrl: './customer-sign-up.component.html',
  styleUrls: ['./customer-sign-up.component.css']
})
export class CustomerSignUpComponent implements OnInit {
  genderList: Gender[] = [];
  provinceList: Province[] = [];
  districtList: District[] = [];
  communeList: Commune[] = [];
  customerForm: FormGroup;
  accountList: Account[];
  password: string;

  constructor(private customerService: CustomerService,
              private genderService: GenderService,
              private addressService: AddressService,
              private accountService: AccountService,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.getGenderList();
    this.getProvinceList();
    this.getDistrictList();
    this.getCommuneList();
    this.getAccountList();


  }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      account: new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required])
      }, [this.checkConfirmPassword]),
      phone: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl(''),
      address: new FormGroup({
        province: new FormControl(null, [Validators.required]),
        district: new FormControl(null, [Validators.required]),
        commune: new FormControl(null, [Validators.required])
      })
    });
  }

  createCustomer() {
    console.log(this.customerForm.value);
    // this.customerService.save(this.customerForm.value).subscribe(value => {
    //   this.snackBar.open('Sign Up Complete', 'Ok', {duration: 3000});
    // });
  }

  getAccountList() {
    this.accountService.getAccountList().subscribe(data => {
      this.accountList = data;
    });
  }

  getGenderList() {
    this.genderService.getGenderList().subscribe(data => {
      this.genderList = data;
    });
  }

  getProvinceList() {
    this.addressService.getProvinceList().subscribe(data => {
      this.provinceList = data;
    });
  }

  getDistrictList() {
    this.addressService.getDistrictList().subscribe(data => {
      this.districtList = data;
    });
  }

  getCommuneList() {
    this.addressService.getCommuneList().subscribe(data => {
      this.communeList = data;
    });
  }


  checkConfirmPassword(group: AbstractControl): any {
    if (group.get('password').value !== group.get('confirmPassword').value) {
      return {invalidPassword: true};
    }
    return null;
  }
}
