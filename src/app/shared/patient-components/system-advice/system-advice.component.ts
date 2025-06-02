import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../../core/services/theme.service';
import { PatientConsultationApiService, AskConsultationDto, Consultation } from '../../../core/services/patient-serivces/patient-consultation-api.service';
import { environment } from '../../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-ask-consultation',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-5xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">🩺 Submit New Consultation</h2>

    <form (ngSubmit)="submit()" class="space-y-4">

      <textarea [(ngModel)]="model.symptomDescription"
                name="symptomDescription"
                class="p-4 rounded w-full border border-gray-300"
                rows="5"
                placeholder="Describe your symptoms..." required>
      </textarea>

      <div class="flex gap-3">
        <button type="submit" class="px-6 py-2 rounded-lg text-white font-semibold bg-indigo-600 hover:bg-indigo-700">
          {{ isLoading ? 'Submitting...' : 'Submit' }}
        </button>
      </div>
    </form>

    <!-- Loader -->
    <div *ngIf="isLoading" class="text-center text-lg py-10">
      🧠 Generating AI System Advice...
    </div>

    <!-- Response -->
    <div *ngIf="advice" class="mt-8 p-6 rounded-xl shadow"
         [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

      <h3 class="text-2xl font-bold mb-4">🤖 System Advice</h3>

      <div class="prose max-w-full text-lg leading-relaxed" [innerHTML]="renderMarkdown(advice)"></div>

    </div>

    <!-- Error -->
    <div *ngIf="errorMessage" class="mt-6 p-4 bg-red-100 text-red-700 rounded border border-red-400 text-center">
      {{ errorMessage }}
    </div>

  </div>
  `
})
export class SystemAdviceComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private api = inject(PatientConsultationApiService);
  private theme = inject(ThemeService);
  private http = inject(HttpClient);

  patientId!: number;
  model: AskConsultationDto = { symptomDescription: '' };
  advice: string | null = null;
  errorMessage: string | null = null;
  isLoading = false;
  isDarkMode = false;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    // Load patientId from backend
    this.http.get<any>(`${environment.apiUrl}/Auth/me`, { withCredentials: true }).subscribe({
      next: (user) => {
        this.patientId = user.id;
      }
    });
  }

  submit() {
    if (!this.model.symptomDescription) return;

    this.isLoading = true;
    this.errorMessage = null;
    this.advice = null;

    this.api.askConsultation(this.patientId, this.model)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result: Consultation) => {
          this.advice = result.systemAdvice;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Failed to generate system advice. Please try again.';
          this.isLoading = false;
        }
      });
  }

  // Very simple markdown renderer (safe for demo)
  renderMarkdown(text: string): string {
    if (!text) return '';
    return text
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }
}
