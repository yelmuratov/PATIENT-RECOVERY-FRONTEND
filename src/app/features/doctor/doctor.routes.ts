import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `<h2>Doctor Feature Works!</h2>`
})
export class DoctorComponent {}

@Component({
  standalone: true,
  template: `<h2>Create Doctor</h2>`
})
export class CreateDoctorComponent {}

@Component({
  standalone: true,
  template: `<h2>Edit Doctor</h2>`
})
export class EditDoctorComponent {}

@Component({
  standalone: true,
  template: `<h2>Doctor Details</h2>`
})
export class DoctorDetailComponent {}

export const DOCTOR_ROUTES: Routes = [
  {
    path: '',
    component: DoctorComponent // list all doctors
  },
  {
    path: 'create',
    component: CreateDoctorComponent
  },
  {
    path: 'edit/:id',
    component: EditDoctorComponent
  },
  {
    path: ':id',
    component: DoctorDetailComponent
  }
];
