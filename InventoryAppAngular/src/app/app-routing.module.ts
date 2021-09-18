import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'header',component: HeaderComponent },
  { path: '**', redirectTo: '/header' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
