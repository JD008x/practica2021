import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/categoryService';
import { CommonService } from 'src/app/services/commonService';
import { CategoryDialog } from './category-dialog';

@Component({
  selector: 'app-category-administrator',
  templateUrl: './category-administrator.component.html',
  styleUrls: ['./category-administrator.component.scss']

})
export class CategoryAdministratorComponent implements OnInit {

  editCategory!: Category;
  category: Category[] = this.categoryService.categoryList;
  dataSources: MatTableDataSource<Category> = new MatTableDataSource<Category>(this.category);
  parent!: Category;
  categoryColumns: string[] = [
    'name',
    'parent_category',
    'actions'
  ];

  constructor(private categoryService: CategoryService, private dialog: MatDialog, private router: Router,
    private activatedRoute: ActivatedRoute, private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.parent = new Category();
  }

  changeClient(value: any) {
    this.parent = value;

  }

  getCategoryList(): void {
    this.categoryService.getCategory().subscribe((list: Category[]) => {
      this.category = list;
      this.updateTable();
    }, (err) => {
      if (err.status === 401) return;
    });
  }

  edit(category: Category) {
    if (category.name) {
      if (this.parent.id === category.id) {
        category.parent_category = new Category();
        this.updateTable();
      }
      else {
        category.parent_category = this.parent;
      }
      this.categoryService.editCategory(category).subscribe();
      this.commonService.showSnackBarMessage("edit complete");
    }
    else {
      this.commonService.showSnackBarMessage("edit fail");
    }
  }

  add() {
    const dialogRef = this.dialog.open(CategoryDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getCategoryList();
      this.updateTable();
    });

  }

  updateTable(): void {
    //  this.getCategoryList();
    this.dataSources = new MatTableDataSource<Category>(this.category);
  }

  delete(id: number, index: number): void {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        this.commonService.showSnackBarMessage("category deleted");
        this.dataSources.data.slice(index, 1);
        this.getCategoryList();
        this.updateTable();
      }, (err) => {
        this.commonService.showSnackBarMessage("delete fail");
      }
    );

  }
}
