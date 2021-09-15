import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ServiceService} from '../../../service/service/service.service';

class ServicesDeleteComponent {
}

@Component({
  selector: 'app-delete-services',
  templateUrl: './delete-services.component.html',
  styleUrls: ['./delete-services.component.css']
})
export class DeleteServicesComponent implements OnInit {

  public code: string;
  public id: number;

  constructor(public dialogRef: MatDialogRef<ServicesDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toast: ToastrService,
              private serviceService: ServiceService) {
  }

  ngOnInit(): void {
    console.log(this.data.name);
    this.code=this.data.name.code;
    this.id=this.data.name.servicesId;
    console.log(this.id);


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
    console.log(this.id);
    this.serviceService.deleteServices(this.id).subscribe(dataDialog => {
    this.dialogRef.close();
    this.toast.success('delete success fully');
    });
  }
}
