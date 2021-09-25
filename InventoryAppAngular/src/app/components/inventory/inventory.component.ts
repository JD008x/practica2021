import { Component, OnInit } from '@angular/core';
import { ItemServices } from 'src/app/services/itemServices';
import { Item } from "../../models/item";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  items: Item[] = [];
  columnsToDisplay = ['name', 'description', 'user', 'location', 'creationDate', 'modifiedAt'];


  constructor(private itemServices: ItemServices) {
    this.itemServices.getItems().subscribe((items) => {
      this.items = items;
    });
  }

  ngOnInit(): void {
  }

}
