import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConsultationApiService,ConsultationDto } from '../../../core/services/consultation.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-consultation-detail',
  imports: [CommonModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">💬 Consultation Details</h2>

    <div *ngIf="consultation" class="space-y-6">
      <div class="grid grid-cols-1 gap-4 text-lg">

        <div>
          <span class="font-semibold">Symptom Description:</span><br/>
          {{ consultation.symptomDescription }}
        </div>

        <div>
          <span class="font-semibold">Doctor Reply:</span><br/>
          {{ consultation.doctorReply || 'No reply yet.' }}
        </div>

      </div>
    </div>

    <div class="mt-8">
      <button class="px-6 py-2 rounded-lg font-semibold"
              [ngClass]="isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-black hover:bg-gray-300'"
              (click)="goBack()">
        🔙 Back to Consultations
      </button>
    </div>

  </div>
  `
})
export class ConsultationDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(ConsultationApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);

  consultationId!: number;
  consultation!: ConsultationDto;
  isDarkMode = false;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    this.consultationId = +this.route.snapshot.params['id'];
    this.service.getById(this.consultationId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.consultation = data;
      });
  }

  goBack() {
    this.router.navigate(['/dashboard/consultation']);
  }
}
