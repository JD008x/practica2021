import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Item } from "../../models/item";
import { ItemServices } from 'src/app/services/itemServices';
import { CategoryService } from 'src/app/services/categoryService';
import { Category } from 'src/app/models/category';
import { Router } from '@angular/router'
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
  category: Category[] = [];
  filteredOptions: Observable<string[]> | undefined;
  constructor(
    private itemServices: ItemServices,
    private categoryServices: CategoryService,
    private router: Router) {
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

    this.getCategoryList();
  }

  async getAllItems() {
    this.items = await this.itemServices.getItemsAsync();
    return this.items;
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().startsWith(filterValue));

  }

  changeClient(value: any) {
    this.router.navigate([`/inventory/${value.id}`]);
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

  getIdFromSelectedOption(selected: string): string {
    var id = '';
    for (var index = 0; index < this.items.length; index++) {
      if (this.items[index].name == selected)
        id = this.items[index].id;
    }
    return id;
  }
  selectedItemHandler(selected: string) {
    var id = this.getIdFromSelectedOption(selected);
    this.router.navigate(['/view-item/' + id]);
   
    
  }
  

}




