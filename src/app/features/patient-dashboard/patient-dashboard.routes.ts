import { Routes } from '@angular/router';
import { Component } from '@angular/core';

// Temporary static placeholders (standalone components)

@Component({
  standalone: true,
  template: `<h2>📈 My Recovery</h2>`
})
export class MyRecoveryComponent {}

@Component({
  standalone: true,
  template: `<h2>🩺 My Symptoms</h2>`
})
export class MySymptomsComponent {}

@Component({
  standalone: true,
  template: `<h2>🤖 System Advice</h2>`
})
export class SystemAdviceComponent {}

@Component({
  standalone: true,
  template: `<h2>💊 My Prescriptions</h2>`
})
export class MyPrescriptionsComponent {}

@Component({
  standalone: true,
  template: `<h2>🏃 Rehab Plan</h2>`
})
export class MyRehabPlanComponent {}

export const PATIENT_DASHBOARD_ROUTES: Routes = [
  {
    path: 'my-recovery',
    component: MyRecoveryComponent
  },
  {
    path: 'my-symptoms',
    component: MySymptomsComponent
  },
  {
    path: 'system-advice',
    component: SystemAdviceComponent
  },
  {
    path: 'my-prescriptions',
    component: MyPrescriptionsComponent
  },
  {
    path: 'rehab-plan',
    component: MyRehabPlanComponent
  }
];
