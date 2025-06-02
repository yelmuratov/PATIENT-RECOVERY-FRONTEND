import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RecoveryLogApiService,RecoveryLogDto } from '../../../core/services/recoverylogapi.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-edit-recovery-log',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">✏️ Edit Recovery Log</h2>

    <div *ngIf="errorMessage" class="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-400">
      {{ errorMessage }}
    </div>

    <form *ngIf="log" (ngSubmit)="save()" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">

        <input class="p-3 border rounded col-span-2"
               [(ngModel)]="log.patientId"
               name="patientId"
               type="number"
               placeholder="Patient ID"
               required />

        <input class="p-3 border rounded col-span-2"
               [(ngModel)]="log.doctorId"
               name="doctorId"
               type="number"
               placeholder="Doctor ID"
               required />

        <input class="p-3 border rounded col-span-2"
               [(ngModel)]="log.temperature"
               name="temperature"
               type="number"
               placeholder="Temperature"
               required />

        <input class="p-3 border rounded col-span-2"
               [(ngModel)]="log.heartRate"
               name="heartRate"
               type="number"
               placeholder="Heart Rate"
               required />

        <input class="p-3 border rounded col-span-2"
               [(ngModel)]="log.systolic"
               name="systolic"
               type="number"
               placeholder="Systolic"
               required />

        <input class="p-3 border rounded col-span-2"
               [(ngModel)]="log.diastolic"
               name="diastolic"
               type="number"
               placeholder="Diastolic"
               required />

        <input class="p-3 border rounded col-span-2"
               [(ngModel)]="log.painLevel"
               name="painLevel"
               type="number"
               placeholder="Pain Level (0-10)"
               required />

        <textarea class="p-3 border rounded col-span-2"
                  [(ngModel)]="log.description"
                  name="description"
                  placeholder="Additional Description (optional)">
        </textarea>

        <input class="p-3 border rounded col-span-2"
               [(ngModel)]="log.timestamp"
               name="timestamp"
               type="datetime-local"
               required />

        <div class="col-span-2 flex items-center gap-3">
          <label>Is Emergency:</label>
          <input type="checkbox" [(ngModel)]="log.isEmergency" name="isEmergency" class="w-5 h-5">
        </div>

      </div>

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
export class EditRecoveryLogComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(RecoveryLogApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);

  logId!: number;
  log!: RecoveryLogDto;
  errorMessage: string = '';
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

  save() {
    this.errorMessage = '';

    this.service.update(this.logId, this.log)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigate(['/dashboard/recovery-log']),
        error: (err) => {
          console.error(err);
          this.errorMessage = err?.error?.message || 'An unexpected error occurred.';
        }
      });
  }

  cancel() {
    this.router.navigate(['/dashboard/recovery-log']);
  }
}
