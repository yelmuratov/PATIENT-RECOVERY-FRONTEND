import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RecoveryLogApiService, CreateRecoveryLogDto } from '../../../core/services/recoverylogapi.service';
import { ThemeService } from '../../../core/services/theme.service';
import { PatientApiService, PatientDto } from '../../../core/services/patient-api.service';
import { DoctorApiService, DoctorDto } from '../../../core/services/doctor-api.service';

@Component({
  standalone: true,
  selector: 'app-create-recovery-log',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-5xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">➕ Create Recovery Log</h2>

    <div *ngIf="errorMessage" class="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-400">
      {{ errorMessage }}
    </div>

    <form (ngSubmit)="save()" class="space-y-4">

      <!-- Patient Select -->
      <div>
        <label class="block font-semibold mb-1">Patient:</label>
        <select class="p-3 border rounded w-full" [(ngModel)]="selectedPatientId" name="patientId" required>
          <option value="" disabled selected>Select Patient</option>
          <option *ngFor="let p of patients" [value]="p.id">{{ p.fullName }}</option>
        </select>
      </div>

      <!-- Doctor Select -->
      <div>
        <label class="block font-semibold mb-1">Doctor:</label>
        <select class="p-3 border rounded w-full" [(ngModel)]="log.doctorId" name="doctorId" required>
          <option value="" disabled selected>Select Doctor</option>
          <option *ngFor="let d of doctors" [value]="d.id">{{ d.fullName }}</option>
        </select>
      </div>

      <div class="grid grid-cols-2 gap-4">

        <div>
          <label>Temperature:</label>
          <input class="p-3 border rounded w-full" [(ngModel)]="log.temperature" name="temperature" type="number" required />
        </div>

        <div>
          <label>Heart Rate:</label>
          <input class="p-3 border rounded w-full" [(ngModel)]="log.heartRate" name="heartRate" type="number" required />
        </div>

        <div>
          <label>Systolic:</label>
          <input class="p-3 border rounded w-full" [(ngModel)]="log.systolic" name="systolic" type="number" required />
        </div>

        <div>
          <label>Diastolic:</label>
          <input class="p-3 border rounded w-full" [(ngModel)]="log.diastolic" name="diastolic" type="number" required />
        </div>

        <div>
          <label>Pain Level (0-10):</label>
          <input class="p-3 border rounded w-full" [(ngModel)]="log.painLevel" name="painLevel" type="number" required />
        </div>

        <div class="col-span-2">
          <label>Timestamp:</label>
          <input class="p-3 border rounded w-full" [(ngModel)]="log.timestamp" name="timestamp" type="datetime-local" required />
        </div>

        <div class="col-span-2">
          <label>Description:</label>
          <textarea class="p-3 border rounded w-full" [(ngModel)]="log.description" name="description"></textarea>
        </div>

        <div class="col-span-2 flex items-center gap-3">
          <label>Is Emergency:</label>
          <input type="checkbox" [(ngModel)]="log.isEmergency" name="isEmergency" class="w-5 h-5">
        </div>

      </div>

      <div class="flex gap-3">
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
export class CreateRecoveryLogComponent implements OnInit {
  private service = inject(RecoveryLogApiService);
  private patientService = inject(PatientApiService);
  private doctorService = inject(DoctorApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);

  patients: PatientDto[] = [];
  doctors: DoctorDto[] = [];
  selectedPatientId: number | null = null;

  log: CreateRecoveryLogDto = {
    doctorId: 0,
    temperature: 0,
    heartRate: 0,
    systolic: 0,
    diastolic: 0,
    painLevel: 0,
    timestamp: new Date().toISOString().substring(0, 16),
    description: '',
    isEmergency: false
  };

  errorMessage: string = '';
  isDarkMode = false;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(dark => this.isDarkMode = dark);

    // Load patients
    this.patientService.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => this.patients = result.items ?? []);

    // Load doctors
    this.doctorService.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => this.doctors = result.items.filter(doc => doc.role === 1));
  }

  save() {
    if (!this.selectedPatientId) {
      this.errorMessage = 'Please select patient';
      return;
    }

    this.service.create(this.selectedPatientId, this.log)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigate(['/dashboard/recovery']),
        error: (err) => {
          console.error(err);
          this.errorMessage = err?.error?.message || 'An unexpected error occurred.';
        }
      });
  }

  cancel() {
    this.router.navigate(['/dashboard/recovery']);
  }
}
