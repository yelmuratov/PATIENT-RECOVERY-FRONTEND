import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConsultationApiService } from '../../../core/services/consultation.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-ask-consultation',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-3xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">➕ Ask for Consultation</h2>

    <!-- Error message -->
    <div *ngIf="errorMessage" class="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-400">
      {{ errorMessage }}
    </div>

    <form (ngSubmit)="submit()" class="space-y-4">

      <textarea class="p-3 border rounded w-full h-40"
                [(ngModel)]="symptomDescription"
                name="symptomDescription"
                placeholder="Describe your symptoms in detail..."
                required></textarea>

      <div class="flex gap-3">
        <button type="submit" class="px-6 py-2 rounded-lg text-white font-semibold"
                [ngClass]="isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'">
          Submit
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
export class AskConsultationComponent implements OnInit {
  private service = inject(ConsultationApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);

  patientId: number = 0; 
  symptomDescription: string = '';
  errorMessage: string = '';
  isDarkMode = false;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    // In real app — replace with authenticated patient id:
    this.patientId = 1;
  }

  submit() {
    this.errorMessage = '';

    this.service.askConsultation(this.patientId, { symptomDescription: this.symptomDescription })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigate(['/dashboard/consultation']),
        error: (err) => {
          console.error(err);
          if (err?.error?.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'An unexpected error occurred.';
          }
        }
      });
  }

  cancel() {
    this.router.navigate(['/dashboard/consultation']);
  }
}
