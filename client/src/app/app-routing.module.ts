import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component'; // <-- add this line
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SingleThoughtComponent } from './components/single-thought/single-thought.component';

const routes: Routes = [
  { path: '', redirectTo: 'thought', pathMatch: 'full' },
  { path: 'thought', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'thought/:id', component: SingleThoughtComponent },
  { path: 'login', component: LoginComponent }]
//   { path: 'employees/new', component: AddEmployeeComponent }, // <-- add this line
//   { path: 'employees/edit/:id', component: EditEmployeeComponent }]; // <-- add this line

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
