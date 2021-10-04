import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
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
  cotegoryId?: string;

  constructor(private itemServices: ItemServices, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe((params) => {
      this.cotegoryId = params.id;
    });
    if (!this.cotegoryId) {
      this.itemServices.getItems().subscribe((items) => {
        this.items = new MatTableDataSource(items);
      });

    }
    else {
      this.items.filter = this.cotegoryId;
      this.itemServices.getItems().subscribe((items) => {
        this.items = new MatTableDataSource(items);
      });

      this.items.filterPredicate = (data: Item, filter: string) => {
        return data.category.id === filter;
      }

    }

  };


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
