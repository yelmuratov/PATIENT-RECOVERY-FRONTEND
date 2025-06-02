import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RehabilitationApiService, UpdateRehabilitationProgressDto } from '../../../core/services/rehabilitationapi.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-patient-rehab-progress',
  imports: [CommonModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">📄 Patient Rehabilitation Progress</h2>

    <div *ngIf="loading" class="text-center text-lg text-gray-400">
      Loading progress...
    </div>

    <div *ngIf="!loading && progress" class="space-y-6">
      <div class="p-4 rounded-lg text-lg"
           [ngClass]="isDarkMode ? 'bg-slate-700' : 'bg-gray-100'">
        <span class="font-semibold">Progress Note:</span><br/>
        {{ progress.progressNote || 'No progress yet.' }}
      </div>
    </div>

    <div class="mt-8">
      <button class="px-6 py-2 rounded-lg font-semibold"
              [ngClass]="isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-black hover:bg-gray-300'"
              (click)="goBack()">
        🔙 Back
      </button>
    </div>

  </div>
  `
})
export class PatientRehabProgressComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(RehabilitationApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);

  patientId!: number;
  progress!: UpdateRehabilitationProgressDto;
  isDarkMode = false;
  loading = true;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    this.patientId = +this.route.snapshot.params['patientId'];

    this.service.getProgressByPatient(this.patientId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.progress = data;
        this.loading = false;
      }, () => {
        this.progress = { progressNote: 'No progress found.' };
        this.loading = false;
      });
  }

  goBack() {
    this.router.navigate(['/dashboard/rehabilitation']);
  }
}
