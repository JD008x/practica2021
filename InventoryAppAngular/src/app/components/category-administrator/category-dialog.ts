import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "src/app/models/category";
import { CategoryService } from "src/app/services/categoryService";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'categoryDialog',
  templateUrl: 'category-dialog.html',
})
export class CategoryDialog implements OnInit {

  addCategoryFormGroup!: FormGroup;
  category: Category;
  categoryId: number = 0;

  constructor(private formBilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<CategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.addCategoryFormGroup = Object();
    this.category = Object();
    route.params.subscribe((param) => {
      if (param['id']) {
        this.categoryId = param['id'];
      }
    });
  }

  ngOnInit(): void {
    this.category = this.categoryId == 0 ? new Category() : this.categoryService.getItemById(this.categoryId);

    this.addCategoryFormGroup = this.formBilder.group({
      name: [this.category.name, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.categoryId === 0) {
      this.category = new Category(this.addCategoryFormGroup.value);
      this.category.id = this.categoryService.getLastId() + 1;
      this.categoryService.addItem(this.category);
    }
    else {

      this.category.name = this.addCategoryFormGroup.value.name;
    }
    this.dialogRef.close();
  }
  hasError(controlName: string, errorName: string) {
    return this.addCategoryFormGroup.controls[controlName].hasError(errorName);
  }



}
