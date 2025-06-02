import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RecoveryLogApiService,RecoveryLogDto } from '../../../core/services/recoverylogapi.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-recovery-log-detail',
  imports: [CommonModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-5xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">📄 Recovery Log Details</h2>

    <div *ngIf="log" class="space-y-6">
      <div class="grid grid-cols-2 gap-4 text-lg">

        <div><span class="font-semibold">Patient ID:</span> {{ log.patientId }}</div>
        <div><span class="font-semibold">Doctor ID:</span> {{ log.doctorId }}</div>

        <div><span class="font-semibold">Temperature:</span> {{ log.temperature }}°C</div>
        <div><span class="font-semibold">Heart Rate:</span> {{ log.heartRate }} bpm</div>

        <div><span class="font-semibold">Systolic:</span> {{ log.systolic }}</div>
        <div><span class="font-semibold">Diastolic:</span> {{ log.diastolic }}</div>

        <div><span class="font-semibold">Pain Level:</span> {{ log.painLevel }}</div>
        <div>
          <span class="font-semibold">Emergency:</span>
          <span [ngClass]="log.isEmergency ? 'text-red-500 font-bold' : 'text-green-500'">
            {{ log.isEmergency ? 'Yes' : 'No' }}
          </span>
        </div>

        <div class="col-span-2">
          <span class="font-semibold">Timestamp:</span> {{ log.timestamp | date:'yyyy-MM-dd HH:mm' }}
        </div>

        <div class="col-span-2">
          <span class="font-semibold">Description:</span> {{ log.description || 'N/A' }}
        </div>

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
export class RecoveryLogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(RecoveryLogApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);

  logId!: number;
  log!: RecoveryLogDto;
  isDarkMode = false;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    this.logId = +this.route.snapshot.params['id'];
    this.loadLog();
  }

  loadLog() {
    this.service.getById(this.logId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.log = data;
      });
  }

  goBack() {
    this.router.navigate(['/dashboard/recovery']);
  }
}
