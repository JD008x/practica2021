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
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,

  ],
  imports: [
    MatSelectModule,
    MatMenuModule,
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
    MatDialogModule,

  ],
  exports: [
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    SatPopoverModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
