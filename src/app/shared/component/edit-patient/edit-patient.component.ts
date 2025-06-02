import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PatientApiService, PatientDto } from '../../../core/services/patient-api.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-edit-patient',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">✏️ Edit Patient</h2>

    <!-- Error message -->
    <div *ngIf="errorMessage" class="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-400">
      {{ errorMessage }}
    </div>

    <form *ngIf="patient" (ngSubmit)="save()" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">

        <input class="p-3 border rounded col-span-2"
               [(ngModel)]="patient.fullName"
               name="fullName"
               placeholder="Full Name"
               required />

        <input class="p-3 border rounded col-span-2"
               [(ngModel)]="patient.email"
               name="email"
               type="email"
               placeholder="Email"
               required />

        <input class="p-3 border rounded col-span-2"
               [(ngModel)]="patient.password"
               name="password"
               type="password"
               placeholder="Password (leave empty to keep current)" />

        <input class="p-3 border rounded col-span-2"
               [(ngModel)]="patient.phone"
               name="phone"
               placeholder="Phone Number"
               required />

        <input class="p-3 border rounded col-span-2"
               [(ngModel)]="patient.dateOfBirth"
               name="dateOfBirth"
               type="date"
               required />

        <input class="p-3 border rounded col-span-2"
               [(ngModel)]="patient.doctorId"
               name="doctorId"
               type="number"
               placeholder="Assigned Doctor ID"
               required />

      </div>

      <div class="flex gap-3">
        <button type="submit" class="px-6 py-2 rounded-lg text-white font-semibold"
                [ngClass]="isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'">Update</button>

        <button type="button" (click)="cancel()" class="px-6 py-2 rounded-lg font-semibold"
                [ngClass]="isDarkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-black hover:bg-gray-300'">
          Cancel
        </button>
      </div>
    </form>
  </div>
  `
})
export class EditPatientComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(PatientApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);

  patientId!: number;
  patient: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    dateOfBirth: string;
    role: number;
    doctorId: number;
  } = {
    fullName: '',
    email: '',
    password: '',
    phone: '',
    dateOfBirth: '',
    role: 3,
    doctorId: 0
  };

  isDarkMode = false;
  errorMessage: string = '';

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    this.patientId = +this.route.snapshot.params['id'];

    this.service.getById(this.patientId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.patient = {
          fullName: data.fullName,
          email: data.email,
          password: '',
          phone: data.phone,
          dateOfBirth: data.dateOfBirth,
          role: data.role,
          doctorId: data.doctorId
        };
      });
  }

  save() {
    const payload = {
      ...this.patient
    };

    this.service.update(this.patientId, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigate(['/dashboard/patient']),
        error: (err) => {
          console.error(err);
          if (err?.error?.message) {
            this.errorMessage = err.error.message;
          } else if (err?.error?.title) {
            this.errorMessage = err.error.title;
          } else {
            this.errorMessage = 'An unexpected error occurred.';
          }
        }
      });
  }

  cancel() {
    this.router.navigate(['/dashboard/patient']);
  }
}
