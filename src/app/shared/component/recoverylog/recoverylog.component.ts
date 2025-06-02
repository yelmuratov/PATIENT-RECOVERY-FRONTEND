import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RecoveryLogApiService,RecoveryLogDto } from '../../../core/services/recoverylogapi.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-recovery-log',
  imports: [CommonModule, RouterModule],
  template: `
<div class="p-6 rounded-xl shadow-lg w-full max-w-7xl mx-auto"
     [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

  <div class="flex justify-between items-center mb-6">
    <h2 class="text-3xl font-bold">📊 Recovery Logs</h2>
    <a [routerLink]="['/dashboard/recovery/create']"
       class="px-5 py-2 rounded-lg text-white font-semibold"
       [ngClass]="isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'">
      ➕ Add Log
    </a>
  </div>

  <table class="w-full border-collapse">
    <thead>
      <tr [ngClass]="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
        <th class="p-3 text-left">Patient</th>
        <th class="p-3 text-left">Doctor</th>
        <th class="p-3 text-left">Date</th>
        <th class="p-3 text-left">Pain Level</th>
        <th class="p-3 text-left">Emergency</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let log of logs" class="hover:bg-slate-100 dark:hover:bg-slate-700 transition">
        <td class="p-3">#{{ log.patientId }}</td>
        <td class="p-3">#{{ log.doctorId }}</td>
        <td class="p-3">{{ log.timestamp | date:'yyyy-MM-dd' }}</td>
        <td class="p-3">{{ log.painLevel }}</td>
        <td class="p-3">
          <span [ngClass]="log.isEmergency ? 'text-red-500 font-bold' : 'text-green-500'">
            {{ log.isEmergency ? 'Emergency' : 'Normal' }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>

</div>
  `
})
export class RecoveryLogComponent implements OnInit {
  private service = inject(RecoveryLogApiService);
  private theme = inject(ThemeService);
  private destroyRef = inject(DestroyRef);

  logs: RecoveryLogDto[] = [];
  isDarkMode = false;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    this.loadLogs();
  }

  loadLogs() {
    this.service.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.logs = result;
      });
  }
}
