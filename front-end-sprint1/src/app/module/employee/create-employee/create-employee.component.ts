import {Component, Inject, OnInit} from '@angular/core';
import {EmployeeService} from '../../../service/employee/employee.service';
import {AddressService} from '../../../service/address/address.service';
import {GenderService} from '../../../service/gender/gender.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Position} from '../../../model/employee/position';
import {Gender} from '../../../model/customer/gender';
import {Commune} from '../../../model/address/commune';
import {District} from '../../../model/address/district';
import {Province} from '../../../model/address/province';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

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
  private selectedImage: any;
  isImage = false;

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private employeeService: EmployeeService,
              private addressService: AddressService,
              private genderService: GenderService,
              private router: Router,
              private toasts: ToastrService) {
    this.employeeForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      startWorkDate: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      level: new FormControl('', [Validators.required]),
      yearOfExp: new FormControl('', [Validators.required]),
      address: new FormGroup({
        province: new FormControl('', [Validators.required]),
        district: new FormControl('', [Validators.required]),
        commune: new FormControl('', [Validators.required])
      }),
      image: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getPositionList();
    this.getGenderList();
    this.getProvinceList();
    this.getDistrictList();
    this.getCommuneList();
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
    });
  }

  createEmployee() {
    this.employeeService.save(this.employeeForm.value).subscribe(() => {
      this.employeeForm.reset();
      this.isImage = false;
      this.toasts.success('Create new employee successfully !');
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
}
