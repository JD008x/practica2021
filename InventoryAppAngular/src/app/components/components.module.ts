import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/categoryService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContactComponent } from './contact/contact.component';
import { MatButtonModule } from '@angular/material/button';
import { CategoryAdministratorComponent } from './category-administrator/category-administrator.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { InlineEditCategoryComponent } from './category-administrator/inline-edit-category/inline-edit-category.component';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { MatCardModule } from '@angular/material/card';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CategoryDialog } from './category-administrator/category-dialog';
import { BrowserModule } from '@angular/platform-browser';
import { ItemServices } from '../services/itemServices';
import { AddItemComponent } from './add-item/add-item.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CategoryAdministratorComponent, ContactComponent, HomeComponent, AddItemComponent, InlineEditCategoryComponent, CategoryDialog],
  imports: [
    CommonModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    SatPopoverModule,
    MDBBootstrapModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule],

  providers: [CategoryService, ItemServices],
})
export class ComponentsModule { }
