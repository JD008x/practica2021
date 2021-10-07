import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryAdministratorComponent } from './components/category-administrator/category-administrator.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { LocationAdministratorComponent } from './components/location-administrator/location-administrator.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ViewItemComponent } from './components/view-item/view-item.component';
import { ScanItemComponent } from './components/scan-item/scan-item.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'add-item', component: AddItemComponent },
  { path: 'view-item/:id', component: ViewItemComponent },
  { path: 'edit/:id', component: AddItemComponent },
  { path: 'category', component: CategoryAdministratorComponent },
  { path: 'location', component: LocationAdministratorComponent },
  { path: 'inventory/:categoryId', component: InventoryComponent },
  { path: 'scan', component: ScanItemComponent },
  { path: '**', redirectTo: '' },


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
