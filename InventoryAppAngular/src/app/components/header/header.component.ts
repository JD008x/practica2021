import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Item } from "../../models/item";
import { ItemServices } from 'src/app/services/itemServices';
import { CategoryService } from 'src/app/services/categoryService';
import { Router } from '@angular/router'
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showNavbar = false;
  myControl = new FormControl();
  options: string[] = [];
  items: Item[] = [];
  category: Category[] = [];
  filteredOptions: Observable<string[]> | undefined;
  constructor(private itemServices: ItemServices, private categoryServices: CategoryService,
    private router: Router) {
    this.itemServices.getItems().subscribe((items) => {
      this.items = items;
    });
    this.options = this.items.map(item => item.name)
    console.log(this.items);
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.getCategoryList();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.items.map(item => item.name).filter(item => item.toLowerCase().startsWith(filterValue));
    // return this.options.filter(option => option.name.toLowerCase().startsWith(filterValue));
  }

  changeClient(value: any) {

  }

  getCategoryList(): void {
    this.categoryServices.getCategory().subscribe((list: Category[]) => {
      this.category = list;
    }, (err) => {
      if (err.status === 401) return;
    });
  }

  toggleNavbar() {
    this.showNavbar = !this.showNavbar;
  }
  resetNavbar() {
    this.showNavbar = false;
  }

}




