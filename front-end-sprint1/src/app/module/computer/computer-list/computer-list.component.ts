import { Component, OnInit } from '@angular/core';
import {ComputerService} from '../../../service/computer/computer.service';
import {MatDialog} from '@angular/material/dialog';
import {Computer} from '../../../model/computer/computer';
import {ComputerType} from '../../../model/computer/type-computer';
import {ComputerStatus} from '../../../model/computer/status-computer';
import {ComputerManufacturer} from '../../../model/computer/manufacturer-computer';
import {ComputerDeleteComponent} from '../computer-delete/computer-delete.component';
import {ComputerListDeleteComponent} from "../computer-list-delete/computer-list-delete.component";

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.css']
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
  p = 0;
  ps: Array<any> = [];
  constructor(private computerService: ComputerService,
              private dialog: MatDialog
              ) { }

  ngOnInit(): void {
    this.computerService.getAllComputer().subscribe(value => this.listComputer = value);
    console.log(this.listComputer);
    this.computerService.getAllComputerType().subscribe(value => this.listComputerType = value);
    this.computerService.getAllComputerStatus().subscribe(value => this.listComputerStatus = value);
    this.computerService.getAllComputerManufacturer().subscribe(value => this.listComputerManufacturer = value);
    this.getAll();
  }

  private getAll() {
    this.computerService.getAllComputerPage(this.p).subscribe(value => {
      this.listComputerPage = value.content;
      this.ps = new Array<any>(value.totalPages);
    });

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
    this.listComputerId.push(id);
    this.listComputerCode.push(code);
    console.log(this.listComputerId);
    console.log(this.listComputerCode);
  }

  deleteComputers() {
    const dialogRef = this.dialog.open(ComputerListDeleteComponent, {
      width: '500px',
      data: {
        idComputer: this.listComputerId,
        nameComputer: this.listComputerCode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.ngOnInit();
      }
    });
  }
}
