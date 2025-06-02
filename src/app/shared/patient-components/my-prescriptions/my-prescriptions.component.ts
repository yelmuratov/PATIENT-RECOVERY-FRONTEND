import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../../core/services/theme.service';
import { PatientPrescriptionApiService, Prescription } from '../../../core/services/patient-serivces/patient-prescription-api.service';

@Component({
  standalone: true,
  selector: 'app-my-prescriptions',
  imports: [CommonModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-5xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-8">💊 My Prescriptions</h2>

    <div *ngIf="isLoading" class="text-center text-lg py-10">Loading prescriptions...</div>

    <table *ngIf="!isLoading" class="w-full border-collapse">
      <thead>
        <tr [ngClass]="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
          <th class="p-3 text-left">Medication</th>
          <th class="p-3 text-left">Dosage</th>
          <th class="p-3 text-left">Frequency</th>
          <th class="p-3 text-left">Issued Date</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let p of prescriptions" class="hover:bg-slate-100 dark:hover:bg-slate-700 transition">
          <td class="p-3">{{ p.medication }}</td>
          <td class="p-3">{{ p.dosage }}</td>
          <td class="p-3">{{ p.frequency }}</td>
          <td class="p-3">{{ p.issuedDate | date:'mediumDate' }}</td>
        </tr>
      </tbody>
    </table>

    <div *ngIf="!isLoading && prescriptions.length === 0" class="text-center text-lg py-10 text-gray-500">
      No prescriptions found.
    </div>
  </div>
  `
})
export class MyPrescriptionsComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);
  private prescriptionApi = inject(PatientPrescriptionApiService);

  isDarkMode = false;
  prescriptions: Prescription[] = [];
  isLoading = true;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(dark => this.isDarkMode = dark);

    this.prescriptionApi.getPrescriptions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.prescriptions = data;
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
  }
}
