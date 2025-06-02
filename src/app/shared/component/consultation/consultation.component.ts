import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConsultationApiService,ConsultationDto } from '../../../core/services/consultation.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-consultation',
  imports: [CommonModule, RouterModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-6xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold">💬 My Consultations</h2>
      <a routerLink="ask" class="px-5 py-2 rounded-lg text-white font-semibold"
         [ngClass]="isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'">
        ➕ New Consultation
      </a>
    </div>

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
          <td class="p-3">{{ consultation.doctorReply || 'Waiting for doctor...' }}</td>
          <td class="p-3 flex gap-3">
            <a [routerLink]="['/dashboard/consultation', consultation.id]" class="text-blue-500">View</a>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
  `
})
export class ConsultationComponent implements OnInit {
  private service = inject(ConsultationApiService);
  private theme = inject(ThemeService);
  private destroyRef = inject(DestroyRef);

  consultations: ConsultationDto[] = [];
  isDarkMode = false;
  patientId: number = 0; // 👉 Replace with actual patientId from AuthService

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    // In real app: replace hardcoded value with actual logged-in user id
    this.patientId = 1;

    this.loadConsultations();
  }

  loadConsultations() {
    this.service.getByPatient(this.patientId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.consultations = result;
      });
  }
}
