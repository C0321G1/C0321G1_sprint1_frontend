import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Unit} from '../../../model/service/unit';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ServiceService} from '../../../service/service/service.service';
import Swal from 'sweetalert2';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {Services} from '../../../model/service/services';

@Component({
  selector: 'app-services-edit',
  templateUrl: './services-edit.component.html',
  styleUrls: ['./services-edit.component.css']
})
export class ServicesEditComponent implements OnInit {
  editForm: FormGroup;
  id: number;
  unitList: Unit[] = [];
  selectedImage: any = null;
  services: Services;
  urlImage: any;


  constructor(private service: ServiceService,
              private activatedRoute: ActivatedRoute,
              private route: Router,
              private toast: ToastrService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
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
      price: new FormControl('', [Validators.required, Validators.min(1000), Validators.pattern('^\\d+$')]),
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

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];

  }

  edit() {
    Swal.fire({
      title: 'Loading .....',
      text: 'Please waiting ...',
      imageUrl: '../../../../../assets/image/spin.gif',
      imageWidth: '100px',
      showConfirmButton: false,
    });
    const nameImg = this.getCurrentDateTime() + this.selectedImage?.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);

          this.editForm.patchValue({image: url});
          // Call API to create

          this.services = this.editForm.value;
          this.services.image = url;
          console.log(this.services);
          this.service.update(this.id, this.services).subscribe(() => {


            this.route.navigateByUrl('').then(s => {
              this.showSuccess(),
                Swal.close();
            });
          }, e => {
            this.showError();
          });
        });
      })
    ).subscribe();


  }

  validateInterger(abstractControl: AbstractControl) {
    return (abstractControl.value > 0 && abstractControl.value % 1 === 0) ? null : {checkInterger: true};
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
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
    return this.editForm.get('image');
  }
}
