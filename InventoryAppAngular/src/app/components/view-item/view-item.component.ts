import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ItemServices } from 'src/app/services/itemServices';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss']
})
export class ViewItemComponent implements OnInit {

  itemId!: number;
  item!: Item;
  itemIsFound = false;

  qrValue!: string;
  qrsize: number = 400;
  constructor(private itemService: ItemServices, private activatedRoute: ActivatedRoute,
    private router: Router) {

    this.activatedRoute.params.subscribe((params) => {
      this.itemId = params.id;
    });
  }

  ngOnInit(): void {
    if (this.itemId == 0) {
      this.item = new Item();
    } else {
      this.itemService.getItemById(Number.parseInt(this.item.id)).subscribe({

        next: item => {
          this.item = new Item(item);
        }
      });

    }

  }

  editItem() {
    this.router.navigate(['/edit/' + this.itemId]);
  }

}
