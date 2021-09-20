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
import {ToastrService} from 'ngx-toastr';

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
  password: string;

  constructor(private customerService: CustomerService,
              private genderService: GenderService,
              private addressService: AddressService,
              private accountService: AccountService,
              private router: Router,
              private snackBar: MatSnackBar,
              private toast: ToastrService) {
    this.getGenderList();
    this.getProvinceList();
    this.getDistrictList();
    this.getCommuneList();
  }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      account: new FormGroup({
        username: new FormControl('', [Validators.required,
          Validators.pattern('^[A-Za-z0-9 ]+$')]),
        password: new FormControl('', [Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{3,}$')]),
        confirmPassword: new FormControl('', [Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{3,}$')])
      }, [this.checkConfirmPassword]),
      phone: new FormControl('', [Validators.required, Validators.pattern('\\d{10,12}')]),
      gender: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required, this.checkDateOfBirth]),
      address: new FormGroup({
        province: new FormControl('', [Validators.required]),
        district: new FormControl('', [Validators.required]),
        commune: new FormControl('', [Validators.required])
      })
    });
  }

  // creator: vinhdn
  createCustomer() {
    if (this.customerForm.invalid) {
      this.toast.error('Please input correct all info', 'Error');
    } else {
      this.customerService.checkUsername(this.customerForm.value.account).subscribe(value => {
        this.customerService.save(this.customerForm.value).subscribe(data => {
          this.toast.success('Sign Up Complete', 'Ok');
          this.router.navigateByUrl('/login');
          this.customerForm.reset();
        }, error => {
          this.toast.error('System maintained, please connect to Admin !!!', 'Error');
        });
      }, error => {
        this.toast.error('Username is used, Please input another', 'Error');
      });
    }
  }

  // creator: vinhdn
  getGenderList() {
    this.genderService.getGenderList().subscribe(data => {
      this.genderList = data;
    });
  }

  // creator: vinhdn
  getProvinceList() {
    this.addressService.getProvinceList().subscribe(data => {
      this.provinceList = data;
    });
  }

  // creator: vinhdn
  getDistrictList() {
    this.addressService.getDistrictList().subscribe(data => {
      this.districtList = data;
    });
  }

  // creator: vinhdn
  getCommuneList() {
    this.addressService.getCommuneList().subscribe(data => {
      this.communeList = data;
    });
  }

  // creator: vinhdn
  checkConfirmPassword(group: AbstractControl): any {
    if (group.get('password').value !== group.get('confirmPassword').value) {
      return {invalidPassword: true};
    }
    return null;
  }

  // creator: vinhdn
  checkDateOfBirth(data: AbstractControl): any {
    const dateOfBirth = data.value;
    const birthOfYear = Number(dateOfBirth.substr(0, 4));
    const currentYear = new Date().getFullYear();
    return currentYear - birthOfYear >= 16 ? null : {invalidAge: true};
  }
}
