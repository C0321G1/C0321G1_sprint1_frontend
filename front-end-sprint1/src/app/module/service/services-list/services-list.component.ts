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
  public messenger = '';
  public check = 0;
  public checkNumber=true;
  public inputPage = '';

  ps: Array<any> = [];

  constructor(private dialog: MatDialog,
              private toast: ToastrService,
              private serviceService: ServiceService) {

  }

  ngOnInit(): void {
    this.getAllServicesList();
    // this.searchNameCodePrices();
  }
// phap
  getAllServicesList() {
    this.serviceService.getAllServices(this.name, this.p).subscribe(value => {
        this.check=0;
      if (value == null) {
        this.servicesPage = [];
        this.messenger = "List is empty";
        this.p = 0;
      }
      this.servicesPage = value.content;
      this.ps = new Array<any>(value.totalPages);
      console.log(this.servicesPage);
    }, error => {
      console.log(error);
    });
  }
// phap
  searchNameCodePrices() {
    this.serviceService.searchNameCode(this.code, this.name2, this.prices, this.p).subscribe(value => {
      this.check=1;
      if (value == null) {
        this.servicesPage = [];
        this.messenger = "List is empty";
        this.p = 0;
      }
      this.servicesPage = value.content;
      this.ps = new Array<any>(value.totalPages);
      console.log(this.servicesPage);
    }, error => {
      console.log(error);
    });
  }
// phap
  first() {
    if(this.check===0){
      this.p = 0;
      this.getAllServicesList();
    }else {
      this.p = 0;
      this.searchNameCodePrices();
    }
  }
// phap
  last() {
    if (this.check===0){
      this.p = this.ps.length-1;
      this.getAllServicesList();
    }else {
      this.p = this.ps.length-1;
      this.searchNameCodePrices();
    }

  }
// phap
  previous() {
    if (this.p <= 0) {
      if (this.check===0){
        this.p = 0;
        this.getAllServicesList();
      }else {
        this.p = 0;
        this.searchNameCodePrices();
      }
    } else {
      if (this.check===0){
        this.p = this.p - 1;
        this.getAllServicesList();
      }else {
        this.p = this.p - 1;
        this.searchNameCodePrices();
      }

    }

  }
// phap
  next() {
    console.log(this.ps.length);
    if (this.p  > this.ps.length-2 ) {
      if (this.check==0){
        this.p = this.ps.length-1;
        this.getAllServicesList();
      }else {
        this.p = this.ps.length-1;
        this.searchNameCodePrices();
      }
    }else {
      console.log(this.p);
      if (this.check===0){
        this.p =this.p+1;
        console.log(this.p);
        this.getAllServicesList();
      }else {
        this.p =this.p+1;
        this.searchNameCodePrices();
      }

      console.log(this.p);
    }

  }

  //phap
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

// phap
  changePage(event: any) {
   this.checkNumber= !isNaN(event.target.value);
   if (Number(event.target.value)-1<this.ps.length-2){
     this.first();
   }
   else if (Number(event.target.value)>this.ps.length-2){
     this.last();
   }
   else if(this.check==0){
     this.p=Number(event.target.value)-1;

     this.getAllServicesList();
   }else {
     this.p=Number(event.target.value)-1;
     console.log(this.p);
     this.searchNameCodePrices();
   }
  }
}
