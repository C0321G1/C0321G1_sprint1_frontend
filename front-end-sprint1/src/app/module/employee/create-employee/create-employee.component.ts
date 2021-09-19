import {Component, Inject, OnInit} from '@angular/core';
import {EmployeeService} from '../../../service/employee/employee.service';
import {AddressService} from '../../../service/address/address.service';
import {GenderService} from '../../../service/gender/gender.service';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Position} from '../../../model/employee/position';
import {Gender} from '../../../model/customer/gender';
import {Commune} from '../../../model/address/commune';
import {District} from '../../../model/address/district';
import {Province} from '../../../model/address/province';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

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
  msgEmail = '';
  msgCode = '';
  msgDateOfBirth = '';
  msgStartWorkDate = '';
  positionDot = 0;
  msgImage = '';
  arrayFileExt: Array<string>;

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private employeeService: EmployeeService,
              private addressService: AddressService,
              private genderService: GenderService,
              private router: Router,
              private toasts: ToastrService,
              private titleService: Title) {
    this.titleService.setTitle('Create Employee');
  }

  ngOnInit(): void {
    this.getPositionList();
    this.getGenderList();
    this.getProvinceList();
    this.getDistrictList();
    this.getCommuneList();
    this.employeeForm = new FormGroup({
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
        password: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9]{6,}')]),
        confirmPassword: new FormControl('')
      })
    });
  }

  getPositionList() {
    this.employeeService.getPositionList().subscribe(data => {
      this.positionList = data;
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

  createEmployee() {
    this.employeeForm.value.account.username = this.employeeForm.value.email;
    this.employeeForm.value.image = this.image;
    this.employeeService.save(this.employeeForm.value).subscribe( data => {
      if (data.status === false) {
        this.msgEmail = data.msgEmail;
        this.msgCode = data.msgCode;
        this.msgDateOfBirth = data.msgDateOfBirth;
        this.msgStartWorkDate = data.msgStartWorkDate;
        this.toasts.error('Add new employee fail, please check information input', 'Notify');
      } else {
      this.router.navigateByUrl('/employee/list');
      this.toasts.success('Create new employee successfully !', 'Notify');
      }
    }, () => {
        this.toasts.error('Add new employee fail, please check information input', 'Notify');
      });
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  showPreview(event: any) {
    this.isImage = false;
    this.selectedImage = event.target.files[0];
    this.checkImageFile(this.selectedImage.name);
    if (this.msgImage === '') {
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
  }

  checkImageFile(imageFile: string) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = imageFile.length - 1; i > 0; i--) {
      if (imageFile[i] === '.') {
        this.positionDot = i;
      }
    }
    if (this.positionDot === 0) {
        return this.msgImage = 'Image not right format, please choose again image';
    }
    this.arrayFileExt = ['jpg', 'png', 'jpeg', 'gif', 'raw', 'tiff', 'psd', 'eps', 'pdf', 'ai'];
    const fileExtend = imageFile.substr(this.positionDot + 1);
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < this.arrayFileExt.length; j++) {
      if (fileExtend === this.arrayFileExt[j]) {
        return this.msgImage = '';
      }
    }
    return this.msgImage = 'Image not right format, please choose again image';
  }

  checkPassword(newPassword: string, confirmPassword: string) {
    if (newPassword !== confirmPassword) {
      return this.msgConfirmPass = 'New password not match with confirm password';
    } else {
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
    const date = data.value;
    const today = new Date();
    const dateOfBirth = new Date(date);
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    if (age >= 19 ) {
      return null;
    } else if (age === 18) {
      const m = today.getMonth() - dateOfBirth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
        return {invalidAge: true};
      }
      return null;
    } else {
      return {invalidAge: true};
    }
 }

  checkStartWorkDate(data: AbstractControl): any {
    const startWorkDate = data.value;
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    if (startWorkDate < currentDate) {
      return {inValidDate: true};
    }
    return null;
  }

  resetCreateForm() {
    Swal.fire({
      title: 'Are you sure clear to information entered ?',
      text: 'The task cannot be undone !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#de992a',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.isImage = false;
        this.ngOnInit();
      }
    });
  }

  backEmployeeList() {
    Swal.fire({
      title: 'Are you sure back to employee list ?',
      text: 'Changes will not be saved !',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#de992a',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('/employee/list');
      }
    });
  }

  resetMsgEmail() {
    this.msgEmail = '';
  }

  resetMsgCode() {
    this.msgCode = '';
  }

  resetMsgDateOfBirth() {
    this.msgEmail = '';
  }

  resetMsgStartWorkDate() {
    this.msgStartWorkDate = '';
  }
}
