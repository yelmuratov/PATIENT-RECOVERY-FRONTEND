// src/app/features/dashboard/dashboard.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { DashboardLayoutComponent } from '../../shared/component/dashboard-layout/dashboard-layout.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../../shared/component/dashboard/dashboard.component').then(m => m.default)
      },
      {
        path: 'doctor',
        loadChildren: () =>
          import('../doctor/doctor.routes').then(m => m.DOCTOR_ROUTES)
      },
      {
        path: 'patient',
        loadChildren: () =>
          import('../patient/patient.routes').then(m => m.PATIENT_ROUTES)
      },
      {
        path: 'consultation',
        loadChildren: () =>
          import('../consultation/consultation.routes').then(m => m.CONSULTATION_ROUTES)
      },
      {
        path: 'recovery',
        loadChildren: () =>
          import('../recovery/recovery-log.routes').then(m => m.RECOVERY_LOG_ROUTES)
      },
      {
        path: 'rehabilitation',
        loadChildren: () =>
          import('../rehabilitation/rehabilitation.routes').then(m => m.REHABILITATION_ROUTES)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../../shared/component/profile/profile.component').then(m => m.default)
      }
    ]
  }
];

