import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ItemServices } from 'src/app/services/itemServices';
import { Item } from "../../models/item";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  items: MatTableDataSource<Item> = new MatTableDataSource();
  searchValue: string = "";
  columnsToDisplay = ['name', 'description', 'user', 'location', 'creationDate', 'modifiedAt'];


  constructor(private itemServices: ItemServices) {
    this.itemServices.getItems().subscribe((items) => {
      this.items = new MatTableDataSource(items);
    });
  }

  ngOnInit(): void {
  }

  sortData(sort: Sort) {
    console.log("sort", sort);
    this.itemServices.getItems(sort.active, sort.direction).subscribe((items) => {
      this.items = new MatTableDataSource(items);
    });
  }

  filterValues() {
    console.log(this.searchValue);
    this.items.filter = this.searchValue;
  }
}
