import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RehabilitationApiService } from '../../../core/services/rehabilitationapi.service';
import { DoctorApiService, DoctorDto } from '../../../core/services/doctor-api.service';
import { PatientApiService, PatientDto } from '../../../core/services/patient-api.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-create-rehabilitation-plan',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-5xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">➕ Create Rehabilitation Plan</h2>

    <div *ngIf="errorMessage" class="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-400">
      {{ errorMessage }}
    </div>

    <form (ngSubmit)="save()" class="space-y-4 grid grid-cols-2 gap-4">

      <!-- Patient selection -->
      <select class="p-3 border rounded col-span-2"
              [ngClass]="isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-black'"
              [(ngModel)]="form.patientId"
              name="patientId" required>
        <option [ngValue]="0" disabled>Select Patient</option>
        <option *ngFor="let p of patients" [ngValue]="p.id">{{ p.fullName }}</option>
      </select>

      <!-- Doctor selection -->
      <select class="p-3 border rounded col-span-2"
              [ngClass]="isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-black'"
              [(ngModel)]="form.doctorId"
              name="doctorId" required>
        <option [ngValue]="0" disabled>Select Assigned Doctor</option>
        <option *ngFor="let doc of doctors" [ngValue]="doc.id">{{ doc.fullName }}</option>
      </select>

      <!-- Plan content -->
      <textarea class="p-3 border rounded col-span-2 h-40"
                [(ngModel)]="form.plan"
                name="plan"
                placeholder="Write rehabilitation plan..."
                maxlength="500"
                required></textarea>

      <div class="col-span-2 flex gap-3">
        <button type="submit" class="px-6 py-2 rounded-lg text-white font-semibold"
                [ngClass]="isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'">
          Save
        </button>

        <button type="button" (click)="cancel()" class="px-6 py-2 rounded-lg font-semibold"
                [ngClass]="isDarkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-black hover:bg-gray-300'">
          Cancel
        </button>
      </div>
    </form>

  </div>
  `
})
export class CreateRehabilitationPlanComponent implements OnInit {
  private service = inject(RehabilitationApiService);
  private doctorService = inject(DoctorApiService);
  private patientService = inject(PatientApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);

  doctors: DoctorDto[] = [];
  patients: PatientDto[] = [];
  errorMessage: string = '';
  isDarkMode = false;

  form = {
    patientId: 0,
    doctorId: 0,
    plan: ''
  };

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
        this.doctors = result.items.filter(doc => doc.role === 1);
      });
  }

  loadPatients() {
    this.patientService.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.patients = result.items;
      });
  }

  save() {
    this.errorMessage = '';

    this.service.createPlan(this.form.patientId, {
      doctorId: this.form.doctorId,
      plan: this.form.plan
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigate(['/dashboard/rehabilitation']),
        error: (err) => {
          console.error(err);
          this.errorMessage = err?.error?.message || 'An unexpected error occurred.';
        }
      });
  }

  cancel() {
    this.router.navigate(['/dashboard/rehabilitation']);
  }
}
