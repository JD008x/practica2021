import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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

  columnsToDisplay = ['name', 'location', 'creationDate', 'modifiedAt', 'actions'];
  categoryId: string = "";
  orderByProp: string = "";
  orderByDirection: string = "";

  constructor(private itemServices: ItemServices, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      this.categoryId = params.categoryId;
      this.fetch();
    });
  }

  ngOnInit(): void {
  }

  sortData(sort: Sort) {
    console.log("sort", sort);
    this.orderByProp = sort.active;
    this.orderByDirection = sort.direction;
    this.fetch();
  }

  fetch() {
    this.itemServices.getItems(this.orderByProp, this.orderByDirection, this.categoryId).subscribe((items) => {
      this.items = new MatTableDataSource(items);
    });
  }

  filterValues() {
    console.log(this.searchValue);
    this.items.filter = this.searchValue;
  }

  viewItem(itemId: string) {
    console.log("itemId", itemId)
    this.router.navigate([`/view-item/${itemId}`]);
  }

  deleteItem(itemId: string) {
    console.log("itemId", itemId)
    this.itemServices.deleteItem(itemId).subscribe(() => {
      console.log("itemId deleted", itemId)
      this.fetch();
    });
  }
}
