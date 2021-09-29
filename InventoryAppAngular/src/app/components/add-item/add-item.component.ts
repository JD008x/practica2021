import { Component, Input, OnInit } from '@angular/core';
import { ItemServices } from 'src/app/services/itemServices';
import { Item } from 'src/app/models/item';
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/services/categoryService';
import { Category } from 'src/app/models/category';
import { LocationServices } from 'src/app/services/locationServices';
import { Location } from 'src/app/models/location';
import { User } from 'src/app/models/user';
import { UserServices } from 'src/app/services/userServises';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  addItemFormGroup: FormGroup;
  item: Item;
  itemId: string = "0";
  editMode: boolean = false;

  categories: Category[] = [];
  locations: Location[] = [];
  users: User[] = [];

  categorySelected: Category = new Category();
  selectedCategory: string = '';
  selectedUser: string = '';
  selectedLocation: string = '';
  currentCategory: Category = new Category();
  currentLocation: Location = new Location();

  constructor(private fb: FormBuilder,
    private itemService: ItemServices,
    private router: Router,
    private route: ActivatedRoute,
    private categoryServices: CategoryService,
    private locationServices: LocationServices,
    private userServices: UserServices,
  )
  {
   
    this.addItemFormGroup = Object();
    this.currentCategory = new Category();
    this.currentLocation = new Location();
    this.route.params.subscribe((params) => {
      this.itemId = params['id'] ? params['id'] : 0;
    })
    this.item = new Item();
    this.addItemFormGroup = this.fb.group({
      name: [this.item.name, Validators.required],
      description: [this.item.description, Validators.maxLength(100)],
      location: [this.item.location.name, Validators.required],
      category: [this.item.category.name, Validators.required],
      inventoryNumber: [this.item.inventoryNumber, Validators.required],
      createdAt: [this.item.creationDate, Validators.required]

    });
    this.categoryServices.getCategory().subscribe((categories) => {
      this.categories = categories;
    });

    this.locationServices.getLocations().subscribe((locations) => {
      this.locations = locations;
    });

    this.userServices.getUsers().subscribe((users) => {
      this.users = users;
    });

  }

  selectedUserHandler(selected: any) {
    this.selectedUser = selected.value;
  }

  selectedCategoryHandler(selected: any) {
    this.selectedCategory = selected.value;
  }

  selectedLocationHandler(selected: any) {
    this.selectedLocation = selected.value;
  }


  async ngOnInit(): Promise<void> {
  

    if (this.itemId == "0") {
      this.item = new Item();
    } else {
      const currentItem = await this.getItemById();
    }    
    this.editMode = this.itemId != "0" ? true : false;
    var substr = this.item.creationDate.toString().substring(0, 10);
    
    this.addItemFormGroup = this.fb.group({
      name: [this.item.name, Validators.required],
      description: [this.item.description, Validators.maxLength(100)],
      location: [this.item.location.name, Validators.required],
      category: [this.item.category.name, Validators.required],
      inventoryNumber: [this.item.inventoryNumber, Validators.required],
      createdAt: [substr, Validators.required]

    })
  }
  async getItemById() {
    this.item = await this.itemService.getItemByIdAsync(this.itemId);
    return this.item;
  }
  
  onFormSubmit(form: NgForm) {
    console.log(form);

  }
  async getCategory(name: string) {
    this.currentCategory = await this.categoryServices.getCategoryByName(name);
    return this.currentCategory;
  }

  async getLocation(name: string) {
    this.currentLocation = await this.locationServices.getLocationByName(name);
    return this.currentLocation;
  }
  async onSubmit() {

    this.item.id = "";
    this.item.name = this.addItemFormGroup.value.name;
    this.item.description = this.addItemFormGroup.value.description;
    this.item.category.name = this.addItemFormGroup.value.category;
    this.item.location.name = this.addItemFormGroup.value.location;
    this.item.inventoryNumber = this.addItemFormGroup.value.inventoryNumber;
    this.item.modifiedAt = new Date();

    const selectedCategory = await this.getCategory(this.item.category.name);
    this.currentCategory = selectedCategory;

    const selectedLocation = await this.getLocation(this.item.location.name);
    this.currentLocation = selectedLocation;
    

    if (this.itemId == "0") {
      this.item = new Item(this.addItemFormGroup.value);
      this.itemService.addItem(this.item.id,
        this.item.name,
        this.item.description,
        this.currentLocation,
        this.currentCategory,
        this.item.inventoryNumber,
        this.item.creationDate,
        this.item.modifiedAt)
      
      this.router.navigate(['/inventory']);
  
    }
    else {
      let item  = {
        id: this.item.id,
        name: this.item.name,
        description: this.item.description,
        category: this.item.category,
        modifiedAt: this.item.modifiedAt,
        location: this.item.location,
        inventoryNumber:this.item.inventoryNumber,
        creationDate: this.item.creationDate
       }
        this.itemService.editItem(item).subscribe();
        this.router.navigate(['/inventory']);
    }
  }
  hasError(controlName: string, errorName: string) {
    return this.addItemFormGroup.controls[controlName].hasError(errorName);
  }
}