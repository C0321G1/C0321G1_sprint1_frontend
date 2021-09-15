import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServiceService} from '../../../service/service/service.service';
import {ToastrService} from 'ngx-toastr';
import {Services} from '../../../model/service/services';
import {Router} from '@angular/router';
import {Unit} from '../../../model/service/unit';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import Swal from 'sweetalert2';
import {ignoreDiagnostics} from '@angular/compiler-cli/src/ngtsc/typecheck/src/diagnostics';

@Component({
  selector: 'app-services-create',
  templateUrl: './services-create.component.html',
  styleUrls: ['./services-create.component.css']
})
export class ServicesCreateComponent implements OnInit {
  createForm: FormGroup;
  servicesList: Services[] = [];
  unitList: Unit[] = [];
  code = 'SV-0001';
  lastId: number;
  selectedImage: any = null;
  services: Services;
  urlImage: string;
  require: any;
  public isImage = false;
  page: number;
  name: string;

  constructor(private serviceService: ServiceService,
              private toast: ToastrService,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
  ) {
  }

  ngOnInit(): void {
    this.getData();
    this.getInit();
  }

  getData() {
    this.serviceService.getAllServices(this.name, this.page).subscribe(data => {
      this.servicesList = data;
      if (this.servicesList && this.servicesList.length < 1) {
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
      }
    });
    this.serviceService.getAllUnit().subscribe(data => {
      this.unitList = data;
    });
  }

  getInit() {
    this.createForm = new FormGroup({
      id: new FormControl(),
      code: new FormControl(this.code),
      name: new FormControl('', Validators.required),
      prices: new FormControl('', [Validators.required, Validators.min(1000), Validators.pattern('^\\d+$')]),
      quantity: new FormControl('', [Validators.required, this.validateInterger]),
      unit: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  create() {
    console.log(this.createForm.value);
    this.serviceService.create(this.createForm.value).subscribe(data => {
      console.log(this.createForm.value);
      this.router.navigateByUrl('');
      this.showSuccess();
    });

  }

  loadImg() {
    Swal.fire({
      title: 'Đang gửi dữ liệu',
      text: 'Vui lòng chờ ...',
      imageUrl: '../../../../../assets/image/spin.gif',
      imageWidth: '100px',
      showConfirmButton: false,
      allowOutsideClick: false
    });
    const nameImg = this.getCurrentDateTime() + this.selectedImage?.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.createForm.value.image = url;
          this.urlImage = url;
          this.isImage = true;
          Swal.close();
        });
      })
    ).subscribe();
  }

  validateInterger(abstractControl: AbstractControl) {
    return (abstractControl.value > 0 && abstractControl.value % 1 === 0) ? null : {checkInterger: true};
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage !== null) {
      this.loadImg();
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  showSuccess() {
    this.toast.success('Thêm mới thành công !', 'Thông báo : ');
  }

  showError() {
    this.toast.error('Thêm mới thất bại !', 'Cảnh báo : ');
  }

  get newsImageName() {
    return this.createForm.get('image');
  }

  reset() {
    this.isImage = false;
    this.urlImage = '';
  }
}