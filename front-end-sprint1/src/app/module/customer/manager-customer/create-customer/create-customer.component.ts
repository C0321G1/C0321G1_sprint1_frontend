import {Component, OnInit} from '@angular/core';
import {Gender} from '../../../../model/customer/gender';
import {Province} from '../../../../model/address/province';
import {CustomerService} from '../../../../service/customer/customer.service';
import {District} from '../../../../model/address/district';
import {Commune} from '../../../../model/address/commune';
import {CustomerStatus} from '../../../../model/customer/customer-status';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  genderList: Gender[] = [];
  provinceList: Province[]=[];
  districtList: District[]=[];
  communeList: Commune[]=[]
  statusList: CustomerStatus[]=[];


  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getGenderList();
    this.getProvinceList();
    this.getDistrictList();
    this.getCommuneList();
    this.getStatusList();
  }

  getGenderList() {
    this.customerService.getAllGender().subscribe(data => {
      this.genderList = data;
      console.log(data);
    });
  }
  getProvinceList() {
    this.customerService.getAllProvince().subscribe(data => {
      this.provinceList = data;
      console.log(data);
    });
  }

  getDistrictList() {
    this.customerService.getAllDistrict().subscribe(data => {
      this.districtList = data;
      console.log(data);
    });
  }
  getCommuneList() {
    this.customerService.getAllCommune().subscribe(data => {
      this.communeList = data;
      console.log(data);
    });
  }

  getStatusList() {
    this.customerService.getAllCustomerStatus().subscribe(data => {
      this.statusList = data;
      console.log(data);
    });
  }

}
