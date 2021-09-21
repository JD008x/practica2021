import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
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
  styleUrls: ['./category-administrator.component.scss']

})
export class CategoryAdministratorComponent implements OnInit {

  dataSources: Category[];
  categoryList!: InventoryComponentExample;
  categoryColumns: string[] = [
    'id',
    'parent_category',
    'name'
  ];

  constructor(private categoryService: CategoryService, public dialog: MatDialog) {
    this.dataSources = [];
  }

  ngOnInit(): void {
    // this.dataSources = this.categoryService.getCategory();
    this.categoryList = new InventoryComponentExample(this.dataSources);
  }

  add() {
    const dialogRef = this.dialog.open(CategoryDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  update(category: Category, name: string) {
    if (name == null) { return; }
    // copy and mutate
    const copy = this.categoryList.data().slice()
    category.name = name;
    this.categoryList.update(copy);
  }
}

export class InventoryComponentExample extends DataSource<any>{
  private dataSubject = new BehaviorSubject<Category[]>([]);

  data() {
    return this.dataSubject.value;
  }

  update(data: Category[]) {
    this.dataSubject.next(data);
  }

  constructor(data: any[]) {
    super();
    this.dataSubject.next(data);
  }

  connect(collectionViewer: CollectionViewer): Observable<readonly any[]> {
    return this.dataSubject;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    console.log("X");
  }

}
