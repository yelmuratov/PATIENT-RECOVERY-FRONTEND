import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RehabilitationApiService, UpdateRehabilitationPlanDto } from '../../../core/services/rehabilitationapi.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-edit-rehab-plan',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">✏️ Edit Rehabilitation Plan</h2>

    <div *ngIf="errorMessage" class="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-400">
      {{ errorMessage }}
    </div>

    <form (ngSubmit)="save()" class="space-y-4">
      <textarea class="p-3 border rounded w-full h-40"
                [(ngModel)]="plan.plan"
                name="plan"
                placeholder="Edit rehabilitation plan..."
                maxlength="500"
                required></textarea>

      <div class="flex gap-3">
        <button type="submit" class="px-6 py-2 rounded-lg text-white font-semibold"
                [ngClass]="isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'">
          Update
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
export class EditRehabPlanComponent implements OnInit {
  private service = inject(RehabilitationApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);

  planId!: number;
  plan: UpdateRehabilitationPlanDto = { plan: '' };
  errorMessage: string = '';
  isDarkMode = false;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    this.planId = +this.route.snapshot.params['id'];
    this.loadPlan();
  }

  loadPlan() {
    // Normally you should have GET /plan/{id}
    // For now we simulate by pre-filling an empty plan.
    this.plan = { plan: '' }; 
    // When backend provides GET /plan/{id}, you can load actual data here.
  }

  save() {
    this.errorMessage = '';

    this.service.updatePlan(this.planId, this.plan)
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
