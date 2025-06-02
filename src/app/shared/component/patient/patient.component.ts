import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PatientApiService, PatientDto } from '../../../core/services/patient-api.service';
import { DoctorApiService, DoctorDto } from '../../../core/services/doctor-api.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-patient',
  imports: [CommonModule, RouterModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-6xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold">🧍 Patients</h2>
      <a routerLink="create" class="px-5 py-2 rounded-lg text-white font-semibold"
         [ngClass]="isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'">
        ➕ Create Patient
      </a>
    </div>

    <table class="w-full border-collapse">
      <thead>
        <tr [ngClass]="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
          <th class="p-3 text-left">Name</th>
          <th class="p-3 text-left">Email</th>
          <th class="p-3 text-left">Phone</th>
          <th class="p-3 text-left">Assigned Doctor</th>
          <th class="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let patient of patients" class="hover:bg-slate-100 dark:hover:bg-slate-700 transition">
          <td class="p-3">{{ patient.fullName }}</td>
          <td class="p-3">{{ patient.email }}</td>
          <td class="p-3">{{ patient.phone }}</td>
          <td class="p-3">{{ doctorMap[patient.doctorId] || 'Unknown' }}</td>
          <td class="p-3 flex gap-3">
            <a [routerLink]="['/dashboard/patient', patient.id]" class="text-blue-500">View</a>
            <a [routerLink]="['/dashboard/patient/edit', patient.id]" class="text-yellow-400">Edit</a>
            <button class="text-red-500" (click)="delete(patient.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
  `
})
export class PatientComponent implements OnInit {
  private service = inject(PatientApiService);
  private doctorService = inject(DoctorApiService);
  private theme = inject(ThemeService);
  private destroyRef = inject(DestroyRef);
  
  patients: PatientDto[] = [];
  doctors: DoctorDto[] = [];
  doctorMap: { [id: number]: string } = {};
  isDarkMode = false;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    this.loadDoctors();
    this.loadPatients();
  }

  loadDoctors() {
    this.doctorService.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.doctors = result.items.filter(doc => doc.role === 1); // only real doctors
        this.doctorMap = Object.fromEntries(this.doctors.map(doc => [doc.id, doc.fullName]));
      });
  }

  loadPatients() {
    this.service.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.patients = result.items;
      });
  }

  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.service.delete(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.patients = this.patients.filter(p => p.id !== id);
        });
    }
  }
}
