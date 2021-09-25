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

  itemId!: string;
  item!: Item;
  itemIsFound = false;

  qrValue!: string;
  qrsize: number = 200;
  constructor(private itemService: ItemServices, private activatedRoute: ActivatedRoute,
    private router: Router) {

    this.activatedRoute.params.subscribe((params) => {
      this.itemId = params.id;
      this.item = new Item();
    });
    this.qrValue = this.itemId.toString();
  }

  ngOnInit(): void {
    if (!this.itemId) {
      this.item = new Item();
    } else {
      this.itemService.getItemById(this.itemId).subscribe({

        next: item => {
          this.item = new Item(item);
        }
      });
    }
    this.itemIsFound = this.item ? true : false;
  }

  editItem() {
    this.router.navigate(['/edit/' + this.itemId]);
  }

}
