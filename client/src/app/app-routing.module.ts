import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component'; // <-- add this line

const routes: Routes = [
  { path: '', redirectTo: 'thought', pathMatch: 'full' },
  { path: 'thought', component: HomeComponent }]
//   { path: 'employees/new', component: AddEmployeeComponent }, // <-- add this line
//   { path: 'employees/edit/:id', component: EditEmployeeComponent }]; // <-- add this line

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
