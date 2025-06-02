import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PatientApiService, PatientDto } from '../../../core/services/patient-api.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-patient-detail',
  imports: [CommonModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">🧍 Patient Details</h2>

    <div *ngIf="patient" class="space-y-6">
      <div class="grid grid-cols-2 gap-4 text-lg">

        <div>
          <span class="font-semibold">Full Name:</span> {{ patient.fullName }}
        </div>

        <div>
          <span class="font-semibold">Email:</span> {{ patient.email }}
        </div>

        <div>
          <span class="font-semibold">Phone:</span> {{ patient.phone }}
        </div>

        <div>
          <span class="font-semibold">Date of Birth:</span> {{ patient.dateOfBirth | date:'yyyy-MM-dd' }}
        </div>

        <div class="col-span-2">
          <span class="font-semibold">Assigned Doctor ID:</span> {{ patient.doctorId }}
        </div>

      </div>
    </div>

    <!-- Back button -->
    <div class="mt-8">
      <button class="px-6 py-2 rounded-lg font-semibold"
              [ngClass]="isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-black hover:bg-gray-300'"
              (click)="goBack()">
        🔙 Back to Patients
      </button>
    </div>

  </div>
  `
})
export class PatientDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(PatientApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);

  patientId!: number;
  patient!: PatientDto;
  isDarkMode = false;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    this.patientId = +this.route.snapshot.params['id'];

    this.service.getById(this.patientId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.patient = data;
      });
  }

  goBack() {
    this.router.navigate(['/dashboard/patient']);
  }
}
