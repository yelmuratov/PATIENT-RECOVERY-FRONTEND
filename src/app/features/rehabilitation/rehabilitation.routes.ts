import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `<h2>Rehabilitation Dashboard</h2>`
})
export class RehabilitationComponent {}

@Component({
  standalone: true,
  template: `<h2>Create Rehab Plan</h2>`
})
export class CreateRehabPlanComponent {}

@Component({
  standalone: true,
  template: `<h2>Update Rehab Plan</h2>`
})
export class EditRehabPlanComponent {}

@Component({
  standalone: true,
  template: `<h2>Update Rehab Progress</h2>`
})
export class UpdateRehabProgressComponent {}

@Component({
  standalone: true,
  template: `<h2>Patient Progress</h2>`
})
export class PatientRehabProgressComponent {}

export const REHABILITATION_ROUTES: Routes = [
  {
    path: '',
    component: RehabilitationComponent // Default overview page
  },
  {
    path: 'create-plan/:patientId',
    component: CreateRehabPlanComponent
  },
  {
    path: 'edit-plan/:id',
    component: EditRehabPlanComponent
  },
  {
    path: 'update-progress/:id',
    component: UpdateRehabProgressComponent
  },
  {
    path: 'progress/:patientId',
    component: PatientRehabProgressComponent
  }
];
