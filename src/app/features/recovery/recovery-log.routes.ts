import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `<h2>RecoveryLog Feature Works!</h2>`
})
export class RecoveryLogComponent {}

@Component({
  standalone: true,
  template: `<h2>Create RecoveryLog</h2>`
})
export class CreateRecoveryLogComponent {}

@Component({
  standalone: true,
  template: `<h2>Edit RecoveryLog</h2>`
})
export class EditRecoveryLogComponent {}

@Component({
  standalone: true,
  template: `<h2>RecoveryLog Details</h2>`
})
export class RecoveryLogDetailComponent {}

@Component({
  standalone: true,
  template: `<h2>Patient's RecoveryLogs</h2>`
})
export class RecoveryLogByPatientComponent {}

@Component({
  standalone: true,
  template: `<h2>Doctor's RecoveryLogs</h2>`
})
export class RecoveryLogByDoctorComponent {}

@Component({
  standalone: true,
  template: `<h2>All RecoveryLogs</h2>`
})
export class AllRecoveryLogsComponent {}

export const RECOVERY_LOG_ROUTES: Routes = [
  {
    path: '',
    component: RecoveryLogComponent // Default overview or dashboard
  },
  {
    path: 'all',
    component: AllRecoveryLogsComponent
  },
  {
    path: 'create/:patientId',
    component: CreateRecoveryLogComponent
  },
  {
    path: 'edit/:id',
    component: EditRecoveryLogComponent
  },
  {
    path: 'patient/:patientId',
    component: RecoveryLogByPatientComponent
  },
  {
    path: 'doctor/:doctorId',
    component: RecoveryLogByDoctorComponent
  },
  {
    path: ':id',
    component: RecoveryLogDetailComponent
  }
];
