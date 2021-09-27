import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Item } from "../../models/item";
import { ItemServices } from 'src/app/services/itemServices';
import { CategoryService } from 'src/app/services/categoryService';
import {Router} from '@angular/router'
import { analyzeAndValidateNgModules } from '@angular/compiler';

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
  constructor(private itemServices: ItemServices, private categoryServices: CategoryService,
    private router:Router) {
   
  
  }

  async ngOnInit(): Promise<void> {
    const currentItems = await this.getAllItems();
    this.items = currentItems;

    this.options = this.items.map(item => item.name);
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }
  
  async getAllItems() {
    this.items = await this.itemServices.getItemsAsync();
    return this.items;
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
  getIdFromSelectedOption(selected: string): string {
    var id='';
    for (var index = 0; index < this.items.length; index++){
      if (this.items[index].name == selected)
        id = this.items[index].id;
    }
    return id;
  }
  selectedItemHandler(selected: string) {
    var id = this.getIdFromSelectedOption(selected);
    this.router.navigate(['/edit/' + id]);
   
  }
}




