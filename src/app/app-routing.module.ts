import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';

//Imports de los componentes
import {HomesComponent } from './homes/homes.component';
import { ListUsersComponent } from './modules/admin/list-users/list-users.component';
import { RegisterRazaAnimalComponent } from './modules/admin/register-raza-animal/register-raza-animal.component';
import { RegisterTipoAnimalComponent } from './modules/admin/register-tipo-animal/register-tipo-animal.component';
import { HomeComponent } from './modules/hybrid/home/home.component';
import { WelcomeComponent } from './modules/hybrid/welcome/welcome.component';
import { LoginComponent } from './modules/oauth/login/login.component';
import { RegisterComponent } from './modules/oauth/register/register.component';
import { RegisterAnimalComponent } from './modules/user/register-animal/register-animal.component';


const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: RegisterComponent },
  { path: 'register-animal', component: RegisterAnimalComponent, canActivate: [AuthGuardGuard], data: {expectedRoles: 'USUARIO'} },
  { path: 'register-tipo-animal', component: RegisterTipoAnimalComponent, canActivate: [AuthGuardGuard], data: {expectedRoles: 'ADMIN'} },
  { path: 'register-raza-animal', component: RegisterRazaAnimalComponent, canActivate: [AuthGuardGuard], data: {expectedRoles: 'ADMIN'} },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuardGuard], data: {expectedRoles: ['ADMIN', 'USUARIO'] }},
  
  { path: 'list/users', component: ListUsersComponent},
  { path: 'home', component: HomeComponent},
  { path: 'homes', component: HomesComponent },

  { path: '**', pathMatch: 'full', redirectTo: 'homes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
