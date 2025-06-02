import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConsultationApiService ,ConsultationDto} from '../../../core/services/consultation.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-reply-consultation',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">💬 Reply to Consultation</h2>

    <div *ngIf="consultation" class="space-y-6">

      <div class="border p-4 rounded-lg" [ngClass]="isDarkMode ? 'bg-slate-700' : 'bg-gray-100'">
        <span class="font-semibold">Symptom Description:</span><br/>
        {{ consultation.symptomDescription }}
      </div>

      <!-- Reply form -->
      <form (ngSubmit)="submitReply()" class="space-y-4">
        <textarea class="p-3 border rounded w-full h-40"
                  [(ngModel)]="doctorReply"
                  name="doctorReply"
                  placeholder="Write your reply..."
                  required></textarea>

        <div class="flex gap-3">
          <button type="submit" class="px-6 py-2 rounded-lg text-white font-semibold"
                  [ngClass]="isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'">
            Submit Reply
          </button>

          <button type="button" (click)="cancel()" class="px-6 py-2 rounded-lg font-semibold"
                  [ngClass]="isDarkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-black hover:bg-gray-300'">
            Cancel
          </button>
        </div>
      </form>

    </div>
  </div>
  `
})
export class ReplyConsultationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(ConsultationApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);

  consultationId!: number;
  consultation!: ConsultationDto;
  doctorReply: string = '';
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

  submitReply() {
    this.service.replyConsultation(this.consultationId, { doctorReply: this.doctorReply })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.router.navigate(['/dashboard/consultation']);
      });
  }

  cancel() {
    this.router.navigate(['/dashboard/consultation']);
  }
}
