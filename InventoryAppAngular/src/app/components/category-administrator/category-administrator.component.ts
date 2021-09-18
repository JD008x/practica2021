import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category';


@Component({
  selector: 'app-category-administrator',
  templateUrl: './category-administrator.component.html',
  styleUrls: ['./category-administrator.component.scss']
})
export class CategoryAdministratorComponent implements OnInit {


  categoryItems: MatTableDataSource<Category>

  // Category[] =
  //   [{
  //     id: 10001,
  //     name: 'PC01'
  //   },
  //   {
  //     id: 10002,
  //     name: 'P01'
  //   }];

  categoryColumns: string[] = [
    'id',
    'name',
    'parent_category'
  ];

  constructor() {
    this.categoryItems = Object();

  }

  ngOnInit(): void {
    this.categoryItems = new MatTableDataSource<Category>();
  }

}
