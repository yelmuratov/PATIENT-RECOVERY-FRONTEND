import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RecoveryLogApiService, RecoveryLogDto } from '../../../core/services/recoverylogapi.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-6xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">📄 Recovery Logs for Doctor ID: {{ doctorId }}</h2>

    <table class="w-full border-collapse">
      <thead>
        <tr [ngClass]="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
          <th class="p-3 text-left">Date</th>
          <th class="p-3 text-left">Pain</th>
          <th class="p-3 text-left">Emergency</th>
          <th class="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let log of logs" class="hover:bg-slate-100 dark:hover:bg-slate-700 transition">
          <td class="p-3">{{ log.timestamp | date:'yyyy-MM-dd HH:mm' }}</td>
          <td class="p-3">{{ log.painLevel }}</td>
          <td class="p-3">
            <span [ngClass]="log.isEmergency ? 'text-red-500 font-bold' : 'text-green-500'">
              {{ log.isEmergency ? 'Emergency' : 'Normal' }}
            </span>
          </td>
          <td class="p-3 flex gap-3">
            <a [routerLink]="['/dashboard/recovery-log', log.id]" class="text-blue-500">View</a>
          </td>
        </tr>
      </tbody>
    </table>

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
export class RecoveryLogByDoctorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(RecoveryLogApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);

  doctorId!: number;
  logs: RecoveryLogDto[] = [];
  isDarkMode = false;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    this.doctorId = +this.route.snapshot.params['doctorId'];

    this.service.getByDoctor(this.doctorId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => this.logs = data);
  }

  goBack() {
    this.router.navigate(['/dashboard/recovery-log']);
  }
}
