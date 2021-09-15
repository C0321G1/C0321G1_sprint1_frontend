import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Position} from '../../../model/employee/position';
import {Gender} from '../../../model/customer/gender';
import {Province} from '../../../model/address/province';
import {District} from '../../../model/address/district';
import {Commune} from '../../../model/address/commune';
import {AngularFireStorage} from '@angular/fire/storage';
import {EmployeeService} from '../../../service/employee/employee.service';
import {AddressService} from '../../../service/address/address.service';
import {GenderService} from '../../../service/gender/gender.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  positionList: Position[] = [];
  genderList: Gender[] = [];
  provinceList: Province[] = [];
  districtList: District[] = [];
  communeList: Commune[] = [];
  image: string;
  selectedImage: any;
  isImage = false;
  msgConfirmPass: string;
  id: number;

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private employeeService: EmployeeService,
              private addressService: AddressService,
              private genderService: GenderService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toasts: ToastrService) {
    this.id = Number(this.activatedRoute.snapshot.params.id);
    this.employeeForm = new FormGroup({
      employeeId: new FormControl(''),
      code: new FormControl('', [Validators.required, Validators.pattern('^EMP-\\d{4}$')]),
      fullName: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      position: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', [Validators.required, this.checkDateOfBirth]),
      startWorkDate: new FormControl('', [Validators.required, this.checkStartWorkDate]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^0\\d{9,10}$')]),
      level: new FormControl('', [Validators.required, this.checkLevel]),
      yearOfExp: new FormControl('', [Validators.required, this.checkYearOfExp]),
      address: new FormGroup({
        province: new FormControl('', [Validators.required]),
        district: new FormControl('', [Validators.required]),
        commune: new FormControl('', [Validators.required])
      }),
      image: new FormControl(''),
      account: new FormGroup({
        username: new FormControl(''),
        password: new FormControl('', [Validators.required, Validators.pattern('abc')])
      })
    });
  }

  ngOnInit(): void {
    this.getPositionList();
    this.getGenderList();
    this.getProvinceList();
    this.getDistrictList();
    this.getCommuneList();
  }

  getEmployee(id: number) {
    this.employeeService.findById(id).subscribe(data => {
      this.employeeForm.patchValue(data);
    });
  }

  getPositionList() {
    this.employeeService.getPositionList().subscribe(data => {
      this.positionList = data;
    });
  }

  getGenderList() {
    this.genderService.getAll().subscribe(data => {
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
      this.getEmployee(this.id);
    });
  }

  editEmployee() {
    this.employeeForm.value.account.username = this.employeeForm.value.email;
    console.log(this.employeeForm.value);
    this.employeeService.edit(this.employeeForm.value).subscribe(() => {
      this.isImage = false;
      this.toasts.success('Edit employee successfully !');
    });
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.employeeForm.value.image = url;
          this.image = url;
          this.isImage = true;
        });
      })
    ).subscribe();
  }

  checkPassword(newPassword: string, confirmPassword: string) {
    if (newPassword !== confirmPassword) {
      return this.msgConfirmPass = 'New password not match with confirm password';
    } else {
      // this.employeeForm.value.account.password = confirmPassword;
      return  this.msgConfirmPass = '';
    }
  }

  checkLevel(data: AbstractControl): any {
    return data.value > 0 ? null : {invalidLevel: true};
  }

  checkYearOfExp(data: AbstractControl): any {
    return data.value >= 0 ? null : {invalidYearOfExp: true};
  }

  checkDateOfBirth(data: AbstractControl): any {
    const dateOfBirth = data.value;
    const birthOfYear = Number(dateOfBirth.substr(0, 4));
    const currentYear = new Date().getFullYear();
    return currentYear - birthOfYear >= 18 ? null : {invalidAge : true};
  }

  checkStartWorkDate(data: AbstractControl): any {
    const startWorkDate = data.value;
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    if (startWorkDate < currentDate) {
      return {inValidDate: true};
    }
    return null;
  }

}
