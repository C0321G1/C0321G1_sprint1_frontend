import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DeleteServicesComponent} from '../delete-services/delete-services.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private toast: ToastrService) { }

  ngOnInit(): void {
  }
  openDialog(id: any): void {
    console.log(id);
    // this.customerService.findById(id).subscribe(dataDialog => {
    const dialogRef = this.dialog.open(DeleteServicesComponent, {
      width: '500px',
      data: {name: 'DV-0000'},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.toast.success('delete success fully', 'thong bao');
      this.ngOnInit();
    });
    // });
  }
}
