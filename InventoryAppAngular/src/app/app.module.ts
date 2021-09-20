import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { MatTableModule } from '@angular/material/table';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ItemServices } from './services/itemServices';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,

    AddItemComponent


  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatFormFieldModule,

    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    SatPopoverModule,

    MatButtonModule,
    HttpClientModule
  ],
  providers: [ItemServices],
  bootstrap: [AppComponent]

})
export class AppModule { }
