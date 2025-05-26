import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

@Component({
  standalone: true,
  selector: 'app-dashboard-layout',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-blue-900 text-white p-6 space-y-4">
        <h2 class="text-xl font-bold mb-6">Curevia</h2>
        <nav class="flex flex-col space-y-2">
          <a routerLink="doctor" routerLinkActive="font-semibold underline" class="hover:underline">Doctors</a>
          <a routerLink="patient" routerLinkActive="font-semibold underline" class="hover:underline">Patients</a>
          <a routerLink="consultation" routerLinkActive="font-semibold underline" class="hover:underline">Consultations</a>
          <a routerLink="recovery" routerLinkActive="font-semibold underline" class="hover:underline">Recovery Logs</a>
          <a routerLink="rehabilitation" routerLinkActive="font-semibold underline" class="hover:underline">Rehabilitation</a>
          <a routerLink="/auth/logout" class="text-red-400 hover:underline mt-6">Logout</a>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 bg-gray-100 p-6 overflow-auto">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class DashboardLayoutComponent {}

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'doctor',
        pathMatch: 'full'
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
      }
    ]
  }
];
