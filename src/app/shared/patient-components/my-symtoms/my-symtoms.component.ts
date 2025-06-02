import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PatientConsultationApiService, Consultation } from '../../../core/services/patient-serivces/patient-consultation-api.service';
import { RecoveryLogApiService, RecoveryLogDto } from '../../../core/services/recoverylogapi.service';
import { ThemeService } from '../../../core/services/theme.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-my-symptoms',
  imports: [CommonModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-7xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-8">🩺 My Symptoms</h2>

    <div *ngIf="isLoading" class="text-center text-lg py-10">Loading...</div>

    <!-- Recovery Logs Table -->
    <div class="mb-10" *ngIf="!isLoading">

      <table class="w-full border-collapse">
        <thead>
          <tr [ngClass]="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
            <th class="p-3 text-left">Date</th>
            <th class="p-3 text-left">Temperature</th>
            <th class="p-3 text-left">Heart Rate</th>
            <th class="p-3 text-left">Pain Level</th>
            <th class="p-3 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let log of recoveryLogs" class="hover:bg-slate-100 dark:hover:bg-slate-700 transition">
            <td class="p-3">{{ log.timestamp | date:'short' }}</td>
            <td class="p-3">{{ log.temperature }} °C</td>
            <td class="p-3">{{ log.heartRate }} bpm</td>
            <td class="p-3">{{ log.painLevel }}</td>
            <td class="p-3">{{ log.description || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `
})
export class MySymptomsComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private api = inject(PatientConsultationApiService);
  private recoveryApi = inject(RecoveryLogApiService);
  private theme = inject(ThemeService);
  private http = inject(HttpClient);

  consultations: Consultation[] = [];
  recoveryLogs: RecoveryLogDto[] = [];
  isDarkMode = false;
  isLoading = true;
  patientId!: number;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(dark => this.isDarkMode = dark);

    this.http.get<any>(`${environment.apiUrl}/Auth/me`, { withCredentials: true }).subscribe({
      next: (user) => {
        this.patientId = user.id;
        this.loadData();
      }
    });
  }

  loadData() {
    // Load both APIs in parallel

    this.recoveryApi.getByPatient(this.patientId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.recoveryLogs = result;
        this.isLoading = false;
      });
  }
}
