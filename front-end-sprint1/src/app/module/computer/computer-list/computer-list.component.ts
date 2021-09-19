import {Component, OnInit} from '@angular/core';
import {ComputerService} from '../../../service/computer/computer.service';
import {MatDialog} from '@angular/material/dialog';
import {Computer} from '../../../model/computer/computer';
import {ComputerType} from '../../../model/computer/type-computer';
import {ComputerStatus} from '../../../model/computer/status-computer';
import {ComputerManufacturer} from '../../../model/computer/manufacturer-computer';
import {ComputerDeleteComponent} from '../computer-delete/computer-delete.component';
import {ComputerListDeleteComponent} from '../computer-list-delete/computer-list-delete.component';
import {ToastrService} from 'ngx-toastr';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.css'],
})

export class ComputerListComponent implements OnInit {
  listComputer: Computer[] = [];
  listComputerType: ComputerType[] = [];
  listComputerStatus: ComputerStatus[] = [];
  listComputerManufacturer: ComputerManufacturer[] = [];
  listComputerPage: Computer[] = [];
  searchPageInput: any;
  listComputerId = [];
  listComputerCode = [];
  computerId = '';
  location = '';
  startDateFrom = '';
  startDateTo = '';
  statusSearch = '';
  computerTypeSearch = '';
  p = 0;
  ps: Array<any> = [];
  check = 0;
  searchComputerForm: FormGroup;

  constructor(private computerService: ComputerService,
              private dialog: MatDialog,
              private toastrService: ToastrService,
              private title: Title
  ) {
    this.title.setTitle('Computer List');
    this.searchComputerForm = new FormGroup({
      computerId: new FormControl('', [Validators.pattern('^CP[0-9]{4}$')]),
      startUsedDateFrom: new FormControl('', [Validators.required, this.checkDateFrom]),
      // @ts-ignore
      startUsedDateTo: new FormControl('', [Validators.required, this.checkDateTo]),
      location: new FormControl('', [Validators.pattern('^[A,B,C]{1}[0-9]{4}$')]),
      computerStatus: new FormControl('', [Validators.required]),
      computerType: new FormControl('', [Validators.required]),
    }, {validators: (this.checkDate)});
  }

  ngOnInit(): void {
    this.computerService.getAllComputer().subscribe(value => this.listComputer = value);
    this.computerService.getAllComputerType().subscribe(value => this.listComputerType = value);
    this.computerService.getAllComputerStatus().subscribe(value => this.listComputerStatus = value);
    this.computerService.getAllComputerManufacturer().subscribe(value => this.listComputerManufacturer = value);
    this.getAll();
  }

  private getAll() {
    // tslint:disable-next-line:triple-equals
    if (this.check == 1) {
      this.computerService.searchComputer(this.computerId, this.location, this.computerTypeSearch, this.statusSearch,
        this.startDateFrom, this.startDateTo, this.p).subscribe(value => {
        this.listComputerPage = value.content;
        for (let i = 0; i < this.listComputerPage.length; i++) {
          for (let j = 0; j < this.listComputerId.length; j++) {
            if (this.listComputerPage[i].computerId === this.listComputerId[j]) {
              this.listComputerPage[i].flagDelete = 2;
            }
          }
        }
        this.ps = new Array<any>(value.totalPages);
      });
    } else {
      this.computerService.getAllComputerPage(this.p).subscribe(value => {
        this.listComputerPage = value.content;
        for (let i = 0; i < this.listComputerPage.length; i++) {
          for (let j = 0; j < this.listComputerId.length; j++) {
            if (this.listComputerPage[i].computerId === this.listComputerId[j]) {
              this.listComputerPage[i].flagDelete = 2;
            }
          }
        }
        this.ps = new Array<any>(value.totalPages);
      });
    }
  }

  nextPage() {
    this.p = this.p + 1;
    this.getAll();
  }

  previousPage() {
    this.p = this.p - 1;
    this.getAll();
  }

  lastPage() {
    this.p = this.ps.length - 1;
    this.getAll();
  }

  firstPage() {
    this.p = 0;
    this.getAll();
  }

  deleteComputer(computerId: number, computerCode: string) {
    const dialogRef = this.dialog.open(ComputerDeleteComponent, {
      width: '500px',
      data: {
        idComputer: computerId,
        nameComputer: computerCode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.ngOnInit();
      }
    });
  }

  searchPage() {
    this.p = Number(this.searchPageInput) - 1;
    this.getAll();
  }

  addComputerId(id: number, code: string) {
    for (let i = 0; i < this.listComputerId.length; i++) {
      if (this.listComputerId[i] === id) {
        this.listComputerId.splice(i, 1);
        this.listComputerCode.splice(i, 1);
        return;
      }
    }
    this.listComputerId.push(id);
    this.listComputerCode.push(code);
  }

  deleteComputers() {
    if (this.listComputerId.length === 0) {
      this.toastrService.error('Choose computer need to delete, please!!');
      return;
    } else {
      const dialogRef = this.dialog.open(ComputerListDeleteComponent, {
        width: '500px',
        data: {
          idComputer: this.listComputerId,
          nameComputer: this.listComputerCode
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.listComputerId = [];
          this.listComputerCode = [];
          this.ngOnInit();
        }
      });
    }
  }

  searchComputer() {
    const dateFrom = new Date(this.startDateFrom);
    const mesDate = new Date();
    this.p = 0;
    if (dateFrom > new Date()) {
      this.toastrService.error('Input Start date from < ' + mesDate + ' please!!');
      return;
    }
    const dateTo = new Date(this.startDateTo);
    if (dateTo > new Date()) {
      this.toastrService.error('Input Start date to < ' + mesDate + ' please!!');
      return;
    }
    this.computerService.searchComputer(this.computerId.trim(), this.location.trim(), this.computerTypeSearch, this.statusSearch,
      this.startDateFrom, this.startDateTo, this.p).subscribe(value => {
      this.listComputerPage = value.content;
      this.ps = new Array<any>(value.totalPages);
      this.check = 1;
    }, error => {
      if (error.status === 404) {
        this.toastrService.error('Not found computer!!');
      }
    });
  }

  private checkDate(check: AbstractControl): any {
    const fromDate = check.get('startUsedDateFrom');
    const toDate = check.get('startUsedDateTo');
    return fromDate.value <= toDate.value ? null : {errorDateTo: true};
  }

  private checkDateFrom(check: AbstractControl) {
    const fromDate = new Date(check.value);
    const nowDate = new Date();
    return fromDate < nowDate ? null : {errorDateFromNow: true};
  }

  private checkDateTo(check: AbstractControl) {
    const toDate = new Date(check.value);
    const nowDate = new Date();
    return toDate < nowDate ? null : {errorDateToNow: true};
  }

  resetForm() {
    this.searchComputerForm = new FormGroup({
      computerId: new FormControl('', [Validators.pattern('^CP[0-9]{4}$')]),
      startUsedDateFrom: new FormControl('', [Validators.required, this.checkDateFrom]),
      // @ts-ignore
      startUsedDateTo: new FormControl('', [Validators.required, this.checkDateTo]),
      location: new FormControl('', [Validators.pattern('^[A,B,C]{1}[0-9]{4}$')]),
      computerStatus: new FormControl('', [Validators.required]),
      computerType: new FormControl('', [Validators.required]),
    }, {validators: (this.checkDate)});
    this.check = 0;
    this.ngOnInit();
  }
}
