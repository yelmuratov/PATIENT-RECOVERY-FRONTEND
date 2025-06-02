import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PatientApiService, PatientDto } from '../../../core/services/patient-api.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-patient-by-doctor-id',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-6xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-8">👨‍⚕️ Patients Assigned to Doctor</h2>

    <div *ngIf="isLoading" class="text-center py-10 text-lg">Loading patients...</div>

    <div *ngIf="errorMessage" class="text-red-500 text-center py-4">{{ errorMessage }}</div>

    <table *ngIf="!isLoading && patients.length > 0" class="w-full border-collapse">
      <thead>
        <tr [ngClass]="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
          <th class="p-3 text-left">Full Name</th>
          <th class="p-3 text-left">Email</th>
          <th class="p-3 text-left">Phone</th>
          <th class="p-3 text-left">Date of Birth</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let patient of patients" class="hover:bg-slate-100 dark:hover:bg-slate-700 transition">
          <td class="p-3">{{ patient.fullName }}</td>
          <td class="p-3">{{ patient.email }}</td>
          <td class="p-3">{{ patient.phone }}</td>
          <td class="p-3">{{ patient.dateOfBirth | date: 'yyyy-MM-dd' }}</td>
        </tr>
      </tbody>
    </table>

    <div *ngIf="!isLoading && patients.length === 0" class="text-center text-lg text-gray-400 py-8">
      No patients assigned to this doctor.
    </div>
  </div>
  `
})
export class PatientByDoctorIdComponent implements OnInit {
  private service = inject(PatientApiService);
  private theme = inject(ThemeService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  patients: PatientDto[] = [];
  isDarkMode = false;
  isLoading = true;
  errorMessage: string = '';
  doctorId!: number;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(dark => this.isDarkMode = dark);

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('doctorId');
      if (idParam) {
        this.doctorId = parseInt(idParam);
        this.loadPatients();
      } else {
        this.errorMessage = "Doctor ID not found in route.";
        this.isLoading = false;
      }
    });
  }

  loadPatients() {
    this.service.getByDoctorId(this.doctorId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.patients = result;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to load patients.';
          this.isLoading = false;
        }
      });
  }
}
