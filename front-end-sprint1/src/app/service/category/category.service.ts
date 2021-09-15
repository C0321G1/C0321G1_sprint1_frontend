import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../model/category/category";

const CATEGORY_API = 'http://localhost:8080/api/category/';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<Category> {
    return this.http.get<Category>(CATEGORY_API + id);
  }
}
