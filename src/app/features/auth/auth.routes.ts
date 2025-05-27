import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { LoginComponent } from '../../shared/component/login/login.component';
import { authGuard } from '../../core/guards/auth.guard';
import { loginGuard } from '../../core/guards/login.guard';

@Component({
  standalone: true,
  template: `<h2>User Profile (Me) Works!</h2>`
})
export class MeComponent {}

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'me',
    component: MeComponent,
    canActivate: [authGuard]
  }
];
