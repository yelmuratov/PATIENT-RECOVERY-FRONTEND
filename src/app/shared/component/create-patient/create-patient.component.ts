import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PatientApiService } from '../../../core/services/patient-api.service';
import { DoctorApiService, DoctorDto } from '../../../core/services/doctor-api.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-create-patient',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">➕ Create Patient</h2>

    <!-- Error message -->
    <div *ngIf="errorMessage" class="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-400">
      {{ errorMessage }}
    </div>

    <form (ngSubmit)="save()" class="space-y-4">
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
               placeholder="Password" 
               required />

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

        <!-- Doctor select -->
        <select class="p-3 border rounded col-span-2"
                [ngClass]="isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-black'"
                [(ngModel)]="patient.doctorId"
                name="doctorId" required>

          <option [ngValue]="0" disabled>Select Assigned Doctor</option>
          <option *ngFor="let doc of doctors" [ngValue]="doc.id">{{ doc.fullName }}</option>

        </select>

      </div>

      <div class="flex gap-3">
        <button type="submit" class="px-6 py-2 rounded-lg text-white font-semibold"
                [ngClass]="isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'">Save</button>
      </div>
    </form>

  </div>
  `
})
export class CreatePatientComponent implements OnInit {
  private service = inject(PatientApiService);
  private doctorService = inject(DoctorApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);

  patient = {
    fullName: '',
    email: '',
    password: '',
    phone: '',
    dateOfBirth: '',
    role: 3, // Fixed: Patient role
    doctorId: 0
  };

  doctors: DoctorDto[] = [];
  isDarkMode = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    this.loadDoctors();
  }

loadDoctors() {
  this.doctorService.getAll()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(result => {
      this.doctors = result.items.filter(doc => doc.role === 1); // only pure doctors
    });
}

  save() {
    this.errorMessage = '';
    this.service.create(this.patient)
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
}
