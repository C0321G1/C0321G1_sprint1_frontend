import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../service/account/token-storage.service";
import {Category} from "../../../model/category/category";
import {CategoryService} from "../../../service/category/category.service";

@Component({
  selector: 'app-guest-homepage',
  templateUrl: './guest-homepage.component.html',
  styleUrls: ['./guest-homepage.component.css']
})
export class GuestHomepageComponent implements OnInit {
  category: Category;
  constructor(private tokenStorage: TokenStorageService,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategory()
  }

  getCategory() {
    this.categoryService.findById(this.tokenStorage.getUser().category).subscribe(data => {
        this.category = data;
    })
  }
}
