import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/categoryService';
import { CategoryDialog } from './category-dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-category-administrator',
  templateUrl: './category-administrator.component.html',
  styleUrls: ['./category-administrator.component.scss'],
  providers: [CategoryService]
})
export class CategoryAdministratorComponent implements OnInit {

  dataSources: MatTableDataSource<Category>;

  categoryColumns: string[] = [
    'id',
    'name',
    'parent_category',
    'actions'
  ];

  constructor(private categoryService: CategoryService, public dialog: MatDialog) {
    this.dataSources = Object();
  }

  ngOnInit(): void {
    this.dataSources = new MatTableDataSource<Category>(this.categoryService.getCategorys());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialog, {
      width: '250px',
    });
  }

}
