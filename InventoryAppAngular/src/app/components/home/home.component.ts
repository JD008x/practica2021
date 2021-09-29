import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { CategoryService } from 'src/app/services/categoryService';
import { ItemServices } from 'src/app/services/itemServices';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listSize: number = 0;
  items: Item[] = this.itemService.itemList;
  constructor(private itemService: ItemServices, private router: Router, private categoryService: CategoryService) {
  }

  goTo(id: string) {
    this.router.navigate(['/view-item/' + id]);
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
