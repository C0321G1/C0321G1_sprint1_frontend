import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../service/account/token-storage.service";
import {Category} from "../../../model/category/category";
import {CategoryService} from "../../../service/category/category.service";
import {Router} from "@angular/router";
import {Customer} from "../../../model/customer/customer";

@Component({
  selector: 'app-guest-homepage',
  templateUrl: './guest-homepage.component.html',
  styleUrls: ['./guest-homepage.component.css']
})
export class GuestHomepageComponent implements OnInit {
  //create: Tra
  category: Category;
  customer: Customer;
  constructor(private tokenStorage: TokenStorageService,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {
    this.getCategory()
    this.customer =this.tokenStorage.getUser().customer;
  }

  getCategory() {
    this.categoryService.findById(this.tokenStorage.getUser().category).subscribe(data => {
        this.category = data;
    })
  }
}
