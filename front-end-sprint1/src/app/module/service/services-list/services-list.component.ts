import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DeleteServicesComponent} from '../delete-services/delete-services.component';
import {ToastrService} from 'ngx-toastr';
import {Services} from '../../../model/service/services';
import {ServiceService} from '../../../service/service/service.service';


@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {
  public servicesPage: Services[] = [];
  public name = '';
  public name2 = '';
  public p = 0;
  public code = '';
  public prices = '';
  public pageTotal: number;
  public totalPage;
  searchPageInput: string;
  ps: Array<any> = [];

  constructor(private dialog: MatDialog,
              private toast: ToastrService,
              private serviceService: ServiceService) {

  }

  ngOnInit(): void {
    this.getAllServicesList();
    // this.searchNameCodePrices();
  }

  getAllServicesList() {
    this.serviceService.getAllServices(this.name, this.p).subscribe(value => {

      if (value == null) {
        this.servicesPage = [];
      } else {
        this.servicesPage = value.content;
        this.p = 0;
        console.log(this.servicesPage);
      }
      this.ps = new Array<any>(value.totalpages);
      console.log(this.ps.length);
    }, error => {
      console.log(error);
    });
  }

  searchNameCodePrices() {
    console.log(this.code);
    console.log(this.name2);
    this.serviceService.searchNameCode(this.code, this.name2, this.prices, this.p).subscribe(value => {
      if (value == null) {
        this.servicesPage = [];
      } else {
        this.servicesPage = value.content;
        this.p = 0;
      }
      console.log(value.http);
      this.ps = new Array<any>(value.totalpages);
    }, error => {
      console.log(error);
    });
  }

  first() {
    this.p = 0;
  }

  last() {
    this.p = this.ps.length - 1;
  }

  previous() {
    if (this.p === 0) {
      this.p = 1;
    }
    this.p = this.p - 1;
    this.getAllServicesList();
  }

  next() {
    if (this.p > this.ps.length - 2) {
      this.p = this.ps.length - 1;
    }
    this.p = this.p + 1;
    this.getAllServicesList();
  }

  setPage(i: number) {
    this.p = i;
    this.getAllServicesList();
  }


  openDialog(id: any): void {
    console.log(id);
    this.serviceService.findById(id).subscribe(dataDialog => {
      console.log(id);
      const dialogRef = this.dialog.open(DeleteServicesComponent, {
        width: '500px',
        data: {name: dataDialog},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }


}
