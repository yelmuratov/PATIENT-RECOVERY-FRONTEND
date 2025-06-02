import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PatientConsultationApiService,Consultation } from '../../../core/services/patient-serivces/patient-consultation-api.service';
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

    <h2 class="text-3xl font-bold mb-8">🩺 My Consultations</h2>

    <div *ngIf="isLoading" class="text-center text-lg py-10">Loading...</div>

    <table *ngIf="!isLoading" class="w-full border-collapse">
      <thead>
        <tr [ngClass]="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
          <th class="p-3 text-left">Date</th>
          <th class="p-3 text-left">Symptoms</th>
          <th class="p-3 text-left">Doctor Reply</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let c of consultations" class="hover:bg-slate-100 dark:hover:bg-slate-700 transition">
          <td class="p-3">{{ c.timestamp | date:'short' }}</td>
          <td class="p-3">{{ c.symptomDescription || '-' }}</td>
          <td class="p-3">{{ c.doctorReply || 'Pending...' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  `
})
export class MySymptomsComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private api = inject(PatientConsultationApiService);
  private theme = inject(ThemeService);
  private http = inject(HttpClient);

  consultations: Consultation[] = [];
  isDarkMode = false;
  isLoading = true;
  patientId!: number;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(dark => this.isDarkMode = dark);

    // Load current patientId dynamically from /Auth/me
    this.http.get<any>(`${environment.apiUrl}/Auth/me`, { withCredentials: true }).subscribe({
      next: (user) => {
        this.patientId = user.id;
        this.loadConsultations();
      }
    });
  }

  loadConsultations() {
    this.api.getPatientConsultations(this.patientId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.consultations = result;
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
  }
}
