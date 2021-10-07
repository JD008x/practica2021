import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ItemServices } from 'src/app/services/itemServices';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

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
    private router: Router, private dialog: MatDialog) {
    this.activatedRoute.params.subscribe((params) => {
      this.itemId = params.id;
      this.item = new Item();
    });
    this.qrValue = this.itemId.toString();

  }

  onClickEditItem(): void {

    this.router.navigate(['/edit/' + this.itemId]);
  }
  onClickViewQr(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: this.qrValue
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngonchanges(): void {

    if (!this.itemId) {
      this.item = new Item();
    } else {
      this.itemService.getItemById(this.itemId).subscribe({

        next: item => {
          this.item = new Item(item);
          this.itemIsFound = this.item.id === '' ? false : true;
        }
      });
    }

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {
      this.itemId = params.id;

      this.item = new Item();
    });

    if (!this.itemId) {
      this.item = new Item();
    } else {
      this.itemService.getItemById(this.itemId).subscribe({

        next: item => {
          this.item = new Item(item);
          this.itemIsFound = this.item.id === '' ? false : true;
        }
      });
    }

  }

}
