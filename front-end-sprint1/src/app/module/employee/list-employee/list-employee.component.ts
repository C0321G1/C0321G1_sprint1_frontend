import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Position} from '../../../model/employee/position';
import {CheckAgeValidator, DateBirthSearchValidator, DatePastValidator} from '../commons/validatorDate.validator';
import {EmployeeService} from '../../../service/employee/employee.service';
import {Employee} from '../../../model/employee/employee';
import {Province} from '../../../model/address/province';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  searchForm: FormGroup;
  flagSearch: number;
  page: number;
  totalPage: number;
  nameDelete: string;
  idDelete: number;

  listPositon: Position[] = [];
  listProvince: Province[] = [];
  listEmployee: Employee[] = [];

  constructor(private employeeService: EmployeeService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      employeeId: new FormControl(''),
      dateOfBirthFrom: new FormControl('', [CheckAgeValidator]),
      dateOfBirthTo: new FormControl('', [CheckAgeValidator]),
      startWorkDateFrom: new FormControl('', [DatePastValidator]),
      startWorkDateTo: new FormControl('', [DatePastValidator]),
      positon: new FormControl(''),
      address: new FormControl(''),
    }, {validators: DateBirthSearchValidator});
    this.flagSearch = 0;
    this.page = 0;
    this.getData();
    this.getAllEmployee(this.page);
  }

  getData() {
    this.employeeService.getAllPosition().subscribe(value => {
      console.log(value);
      // @ts-ignore
      this.listPositon = value;
    });
    this.employeeService.getAllProvince().subscribe(value => {
      console.log(value);
      this.listProvince = value;
    });
  }

// get list employee
  getAllEmployee(page: number) {
    this.employeeService.getAllEmployee(page).subscribe(value => {
      console.log(value.content);
      this.listEmployee = value.content;
      this.totalPage = value.totalPages;
      console.log(this.totalPage);
    }, error => {
      this.toast.error('No data found', 'message error');
    });
  }
  // khue create search employee
  searchEmpoyee(page: number) {
    if (this.searchForm.value.employeeId === '' && this.searchForm.value.dateOfBirthFrom === '' &&
      this.searchForm.value.dateOfBirthTo === '' && this.searchForm.value.startWorkDateFrom === '' && this.searchForm.value.startWorkDateTo
      === '' && this.searchForm.value.positon === '' && this.searchForm.value.address === '') {
      this.toast.info('Please enter if you want to search', 'massage search');
    }else {
      this.flagSearch = 1;
      console.log(this.searchForm.value);
      this.employeeService.searchEmployee(page, this.searchForm.value.employeeId, this.searchForm.value.dateOfBirthFrom,
        this.searchForm.value.dateOfBirthTo, this.searchForm.value.startWorkDateFrom, this.searchForm.value.startWorkDateTo,
        this.searchForm.value.positon, this.searchForm.value.address).subscribe(value => {
        this.totalPage = value.totalPages;
        this.listEmployee = value.content;
        console.log(this.totalPage);
      }, error => {
        this.toast.error('not found employee', 'message search');
        this.flagSearch = 0;
      });
    }
  }

  // khue create method set page 0
  setPage(){
    if (this.flagSearch == 1){
      this.page = 0;
    }
  }

  // reset
  reset(){
    this.searchForm = new FormGroup({
      employeeId: new FormControl(''),
      dateOfBirthFrom: new FormControl('', [CheckAgeValidator]),
      dateOfBirthTo: new FormControl('', [CheckAgeValidator]),
      startWorkDateFrom: new FormControl('', [DatePastValidator]),
      startWorkDateTo: new FormControl('', [DatePastValidator]),
      positon: new FormControl(''),
      address: new FormControl(''),
    }, {validators: DateBirthSearchValidator});
    this.flagSearch = 0;
    this.page = 0;
    this.getAllEmployee(this.page);
  }

  // khue create method next paging
  nextPage() {
    if (this.page < this.totalPage - 1) {
      this.page++;
    }
    console.log(this.page);
    if (this.flagSearch == 0){
      this.getAllEmployee(this.page);
    }else {
      this.searchEmpoyee(this.page);
    }
  }

  // khue create method previous paging
  previousPage() {
    if (this.page > 0) {
      this.page--;
    } else {
      this.page = 0;
    }
    console.log(this.page);
    if (this.flagSearch == 0){
      this.getAllEmployee(this.page);
    }else {
      this.searchEmpoyee(this.page);
    }
  }

  // khue create method first paging
  firstPage() {
    this.page = 0;
    if (this.flagSearch == 0){
      this.getAllEmployee(this.page);
    }else {
      this.searchEmpoyee(this.page);
    }
  }

  // khue create method last paging
  lastPage() {
    this.page = this.totalPage - 1;
    if (this.flagSearch == 0){
      this.getAllEmployee(this.page);
    }else {
      this.searchEmpoyee(this.page);
    }
  }

  // khue create method search paging
  toPage(page: number) {
    if (page < this.totalPage && page >= 0) {
      this.page = page;
      if (this.flagSearch == 0){
        console.log(page);
        this.getAllEmployee(this.page);
      }else {
        this.searchEmpoyee(this.page);
      }
    }else {
      this.toast.warning('Request to enter the number of pages in the list', 'massage search page');
      if (this.flagSearch == 0){
        console.log(page);
        this.getAllEmployee(this.page);
      }else {
        this.searchEmpoyee(this.page);
      }
    }
  }

  // khuê create method show delete employee
  showDelete(name: string, id: number) {
    this.nameDelete = name;
    this.idDelete = id;
    console.log(this.nameDelete, this.idDelete);
  }
  // khuê create method delete employee
  deleteEmployee() {
    this.employeeService.deleteEmployee(this.idDelete).subscribe(value => {
        this.reset();
        this.toast.success('delete ' + this.nameDelete + ' success', 'massage delete');
      },
      error => {
        this.toast.info('delete ' + this.nameDelete + 'failure', 'massage delete');
      });
  }

}
