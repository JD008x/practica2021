import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Item } from "../../models/item";
import { ItemServices } from 'src/app/services/itemServices';
import { CategoryService } from 'src/app/services/categoryService';

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
  filteredOptions: Observable<string[]> | undefined;
  constructor(private itemServices : ItemServices, private categoryServices: CategoryService) {
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
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
  return this.options.filter(option => option.toLowerCase().startsWith(filterValue));
  }

  toggleNavbar(){
    this.showNavbar = !this.showNavbar;
  }
  resetNavbar(){
    this.showNavbar = false;
  }
}




