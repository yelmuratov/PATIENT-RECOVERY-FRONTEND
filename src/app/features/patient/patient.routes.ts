import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `<h2>Patient Feature Works!</h2>`
})
export class PatientComponent {}

@Component({
  standalone: true,
  template: `<h2>Create Patient</h2>`
})
export class CreatePatientComponent {}

@Component({
  standalone: true,
  template: `<h2>Edit Patient</h2>`
})
export class EditPatientComponent {}

@Component({
  standalone: true,
  template: `<h2>Patient Details</h2>`
})
export class PatientDetailComponent {}

@Component({
  standalone: true,
  template: `<h2>Patients by Doctor</h2>`
})
export class PatientsByDoctorComponent {}

export const PATIENT_ROUTES: Routes = [
  {
    path: '',
    component: PatientComponent // List all patients
  },
  {
    path: 'create',
    component: CreatePatientComponent
  },
  {
    path: 'edit/:id',
    component: EditPatientComponent
  },
  {
    path: 'doctor/:doctorId',
    component: PatientsByDoctorComponent
  },
  {
    path: ':id',
    component: PatientDetailComponent
  }
];
