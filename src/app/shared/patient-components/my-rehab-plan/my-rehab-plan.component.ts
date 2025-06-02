import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../../core/services/theme.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PatientRehabilitationApiService } from '../../../core/services/patient-serivces/patient-rehabilitation-api.service';

@Component({
  standalone: true,
  selector: 'app-my-rehab-plan',
  imports: [CommonModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-5xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-8">🏃 My Rehabilitation Plan</h2>

    <div *ngIf="isLoading" class="text-center text-lg py-10">Loading rehab plan...</div>

    <div *ngIf="!isLoading && rehabPlan" class="space-y-6 text-lg whitespace-pre-wrap leading-relaxed">

      <div>
        <strong>Assigned Plan:</strong>
        <p class="mt-2 text-indigo-400">{{ rehabPlan.plan }}</p>
      </div>

      <div *ngIf="rehabPlan.progressNote">
        <strong>Progress Note:</strong>
        <p class="mt-2">{{ rehabPlan.progressNote }}</p>
      </div>

      <div *ngIf="rehabPlan.progressNote === null" class="italic text-gray-400">
        No progress updates yet.
      </div>

    </div>

    <div *ngIf="!isLoading && !rehabPlan" class="text-center text-lg py-10 text-gray-500">
      No active rehabilitation plan found.
    </div>
  </div>
  `
})
export class MyRehabPlanComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);
  private rehabApi = inject(PatientRehabilitationApiService);
  private http = inject(HttpClient);

  isDarkMode = false;
  isLoading = true;
  patientId!: number;
  rehabPlan: any = null;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(dark => this.isDarkMode = dark);

    this.http.get<any>(`${environment.apiUrl}/Auth/me`, { withCredentials: true }).subscribe({
      next: (user) => {
        this.patientId = user.id;
        this.loadRehabPlan();
      }
    });
  }

  loadRehabPlan() {
    this.rehabApi.getProgress(this.patientId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.rehabPlan = data;
          this.isLoading = false;
        },
        error: () => {
          this.rehabPlan = null;
          this.isLoading = false;
        }
      });
  }
}
