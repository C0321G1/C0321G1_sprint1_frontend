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
    this.code = this.data.name;
    this.id = this.data.name;
    console.log(this.id);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
    this.serviceService.deleteServices(this.id).subscribe(dataDialog => {
      this.dialogRef.close();
      // let config = new MatSnackBarConfig();
      // config.duration = 2000;
      // config.verticalPosition = 'top';
      // config.panelClass = ['alert-red'];
      this.toast.success('delete success fully', 'thong bao');

    });
  }
}
