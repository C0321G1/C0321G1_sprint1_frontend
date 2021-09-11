import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {ToastrService} from "ngx-toastr";

class ServicesDeleteComponent {
}

@Component({
  selector: 'app-delete-services',
  templateUrl: './delete-services.component.html',
  styleUrls: ['./delete-services.component.css']
})
export class DeleteServicesComponent implements OnInit {

  public code:String;
  constructor(public dialogRef: MatDialogRef<ServicesDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toast: ToastrService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.code=this.data.name;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  delete() {
    // this.customerService.deleteCustomer(this.id).subscribe(dataDialog => {
    this.dialogRef.close();
    let config = new MatSnackBarConfig();
    config.duration = 2000;
    config.verticalPosition = "top";
    config.panelClass= ["alert-red"];
    this.toast.success('delete success fully','thong bao')

    this.snackBar.open("Create new Customer success","OK", config);
    // });
  }
}
