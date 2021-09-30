import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "src/app/models/category";
import { CategoryService } from "src/app/services/categoryService";

@Component({
  selector: 'categoryDialog',
  templateUrl: 'category-dialog.html',
  styleUrls: ['category-dialog.css'],
})

export class CategoryDialog implements OnInit {

  addCategoryFormGroup!: FormGroup;
  category: Category;
  categoryList!: Category[];

  constructor(private formBilder: FormBuilder,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<CategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Category) {
    this.addCategoryFormGroup = Object();
    this.category = Object();
  }

  changeClient(value: any) {
    console.log(value);
  }

  getCategoryList(): void {
    this.categoryService.getCategory().subscribe((list: Category[]) => {
      this.categoryList = list;
    }, (err) => {
      if (err.status === 401) return;
    });
  }


  ngOnInit(): void {

    this.category = new Category();

    this.getCategoryList();
    this.addCategoryFormGroup = this.formBilder.group({
      name: [this.category.name, Validators.required],
      parent_category: [this.category.parent_category]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitMe() {
    this.category = new Category(this.addCategoryFormGroup.value);
    this.categoryService.addCategory(this.category).subscribe();
    this.dialogRef.close();
  }


  hasError(controlName: string, errorName: string) {
    return this.addCategoryFormGroup.controls[controlName].hasError(errorName);
  }

  public closeMe() {
    this.dialogRef.close();
  }

}
