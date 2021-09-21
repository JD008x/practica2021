import { Component, OnInit } from '@angular/core';
import { ItemServices } from 'src/app/services/itemServices';
import { Item } from 'src/app/models/item';
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  addItemFormGroup: FormGroup;
  item: Item;
  itemId: number = 0;
  editMode: boolean = false;

  constructor(private fb: FormBuilder,
    private itemService: ItemServices,
    private router: Router,
    private route: ActivatedRoute) {
    this.addItemFormGroup = Object();
    this.item = new Item()
    this.route.params.subscribe((params) => {
      this.itemId = params['id'] ? params['id'] : 0;
    })

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

    this.editMode = this.itemId > 0 ? true : false;

    this.addItemFormGroup = this.fb.group({
      name: [this.item.name, Validators.required],
      description: [this.item.description, Validators.maxLength(100)],
      user: [this.item.user, Validators.required],
      location: [this.item.location, Validators.required],
      inventoryNumber: [this.item.inventoryNumber, Validators.required],
      createdAt: [
        this.item.creationDate.toISOString().split('T')[0],
        Validators.required]

    })
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
  }
  onSubmit() {
    if (this.itemId == 0) {
      this.item = new Item(this.addItemFormGroup.value);
      this.itemService.addItem(this.item);
    }
    else {
      this.item.name = this.addItemFormGroup.value.name;
      this.item.description = this.addItemFormGroup.value.description;
      this.item.user = this.addItemFormGroup.value.user;
      this.item.location = this.addItemFormGroup.value.location;
      this.item.inventoryNumber = this.addItemFormGroup.value.inventoryNumber;
      this.item.modifiedAt = new Date();
    }

    this.router.navigate(['/inventory']);
  }
  hasError(controlName: string, errorName: string) {
    return this.addItemFormGroup.controls[controlName].hasError(errorName);
  }
}
