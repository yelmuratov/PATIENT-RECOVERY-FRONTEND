import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-rehabilitation',
  imports: [CommonModule, RouterModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-5xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-8">🏥 Rehabilitation Dashboard</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div class="p-4 rounded-lg shadow-md text-center"
           [ngClass]="isDarkMode ? 'bg-slate-700' : 'bg-slate-100'">
        <h3 class="text-xl font-semibold mb-2">Create Rehabilitation Plan</h3>
        <button class="px-5 py-2 rounded-lg font-semibold text-white"
                [ngClass]="isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'"
                (click)="goToCreate()">
          ➕ Create
        </button>
      </div>

      <div class="p-4 rounded-lg shadow-md text-center"
           [ngClass]="isDarkMode ? 'bg-slate-700' : 'bg-slate-100'">
        <h3 class="text-xl font-semibold mb-2">Patient Progress</h3>
        <button class="px-5 py-2 rounded-lg font-semibold text-white"
                [ngClass]="isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'"
                (click)="goToProgress()">
          📈 View Progress
        </button>
      </div>

    </div>

  </div>
  `
})
export class RehabilitationComponent implements OnInit {
  private router = inject(Router);
  private theme = inject(ThemeService);
  private destroyRef = inject(DestroyRef);

  isDarkMode = false;

  ngOnInit(): void {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(mode => this.isDarkMode = mode);
  }

  goToCreate() {
    // Normally you'll pass actual patientId from patient selection
    this.router.navigate(['/dashboard/rehabilitation/create-plan', 1]); 
  }

  goToProgress() {
    // Same: normally you’ll load current patientId dynamically
    this.router.navigate(['/dashboard/rehabilitation/progress', 1]);
  }
}
