import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RehabilitationApiService, UpdateRehabilitationProgressDto } from '../../../core/services/rehabilitationapi.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-update-rehab-progress',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">✏️ Update Rehabilitation Progress</h2>

    <div *ngIf="errorMessage" class="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-400">
      {{ errorMessage }}
    </div>

    <form (ngSubmit)="save()" class="space-y-4">
      <textarea class="p-3 border rounded w-full h-40"
                [(ngModel)]="progress.progressNote"
                name="progressNote"
                placeholder="Write rehabilitation progress..."
                maxlength="500"
                required></textarea>

      <div class="flex gap-3">
        <button type="submit" class="px-6 py-2 rounded-lg text-white font-semibold"
                [ngClass]="isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'">
          Update Progress
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
export class UpdateRehabProgressComponent implements OnInit {
  private service = inject(RehabilitationApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);

  progressId!: number;
  progress: UpdateRehabilitationProgressDto = { progressNote: '' };
  errorMessage: string = '';
  isDarkMode = false;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    this.progressId = +this.route.snapshot.params['id'];
    this.loadProgress();
  }

  loadProgress() {
    // Normally you'd fetch GET /progress/{id} but you only have GET /progress/{patientId}
    // So we assume here you have pre-fetched or simply start with blank progress.
    this.progress = { progressNote: '' };
  }

  save() {
    this.errorMessage = '';

    this.service.updateProgress(this.progressId, this.progress)
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
