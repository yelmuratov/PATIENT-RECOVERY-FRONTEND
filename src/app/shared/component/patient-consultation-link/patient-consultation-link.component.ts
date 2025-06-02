import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConsultationApiService,ConsultationDto } from '../../../core/services/consultation.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-6xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">💬 Consultations for Patient (ID: {{ patientId }})</h2>

    <table class="w-full border-collapse">
      <thead>
        <tr [ngClass]="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
          <th class="p-3 text-left">Symptom</th>
          <th class="p-3 text-left">Reply</th>
          <th class="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let consultation of consultations" class="hover:bg-slate-100 dark:hover:bg-slate-700 transition">
          <td class="p-3">{{ consultation.symptomDescription }}</td>
          <td class="p-3">{{ consultation.doctorReply || 'Waiting for reply' }}</td>
          <td class="p-3 flex gap-3">
            <a [routerLink]="['/dashboard/consultation', consultation.id]" class="text-blue-500">View</a>
            <a [routerLink]="['/dashboard/consultation/reply', consultation.id]" class="text-yellow-400">Reply</a>
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
export class PatientConsultationListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(ConsultationApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);

  patientId!: number;
  consultations: ConsultationDto[] = [];
  isDarkMode = false;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    this.patientId = +this.route.snapshot.params['patientId'];

    this.service.getByPatient(this.patientId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.consultations = data;
      });
  }

  goBack() {
    this.router.navigate(['/dashboard/patient']);
  }
}
