import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PatientApiService, PatientDto } from '../../../core/services/patient-api.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-patients-by-doctor',
  imports: [CommonModule, RouterModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-6xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">🧍 Patients by Doctor (ID: {{ doctorId }})</h2>

    <div *ngIf="patients.length === 0" class="text-center text-lg text-gray-400">
      No patients assigned to this doctor.
    </div>

    <table *ngIf="patients.length > 0" class="w-full border-collapse">
      <thead>
        <tr [ngClass]="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
          <th class="p-3 text-left">Full Name</th>
          <th class="p-3 text-left">Email</th>
          <th class="p-3 text-left">Phone</th>
          <th class="p-3 text-left">DOB</th>
          <th class="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let patient of patients" class="hover:bg-slate-100 dark:hover:bg-slate-700 transition">
          <td class="p-3">{{ patient.fullName }}</td>
          <td class="p-3">{{ patient.email }}</td>
          <td class="p-3">{{ patient.phone }}</td>
          <td class="p-3">{{ patient.dateOfBirth | date:'yyyy-MM-dd' }}</td>
          <td class="p-3 flex gap-3">
            <a [routerLink]="['/dashboard/patient', patient.id]" class="text-blue-500">View</a>
            <a [routerLink]="['/dashboard/patient/edit', patient.id]" class="text-yellow-400">Edit</a>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Back button -->
    <div class="mt-8">
      <button class="px-6 py-2 rounded-lg font-semibold"
              [ngClass]="isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-black hover:bg-gray-300'"
              (click)="goBack()">
        🔙 Back to Patients
      </button>
    </div>

  </div>
  `
})
export class PatientsByDoctorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(PatientApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);

  doctorId!: number;
  patients: PatientDto[] = [];
  isDarkMode = false;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    this.doctorId = +this.route.snapshot.params['doctorId'];

    this.service.getByDoctorId(this.doctorId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.patients = data;
      });
  }

  goBack() {
    this.router.navigate(['/dashboard/patient']);
  }
}
