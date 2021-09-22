import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemServices } from 'src/app/services/itemServices';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listSize: number = 0;
  items: Item[] = this.itemService.itemList;
  constructor(private itemService: ItemServices) {
  }


  getCategoryList(): void {
    this.itemService.getItems().subscribe((list: Item[]) => {
      this.items = list.slice(list.length - 4, list.length);
    }, (err) => {
      if (err.status === 401) return;
    });
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

}
