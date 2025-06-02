import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DoctorApiService, DoctorDto } from '../../../core/services/doctor-api.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-doctor-detail',
  imports: [CommonModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">👨‍⚕️ Doctor Details</h2>

    <div *ngIf="doctor" class="space-y-6">
      <div class="grid grid-cols-2 gap-4 text-lg">
        <div>
          <span class="font-semibold">Full Name:</span> {{ doctor.fullName }}
        </div>
        <div>
          <span class="font-semibold">Email:</span> {{ doctor.email }}
        </div>
        <div class="col-span-2">
          <span class="font-semibold">Role:</span> {{ getRoleName(doctor.role) }}
        </div>
      </div>
    </div>

    <!-- Back button -->
    <div class="mt-8">
      <button class="px-6 py-2 rounded-lg font-semibold"
              [ngClass]="isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-black hover:bg-gray-300'"
              (click)="goBack()">
        🔙 Back to Doctors
      </button>
    </div>

  </div>
  `
})
export class DoctorDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(DoctorApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);

  doctorId!: number;
  doctor!: DoctorDto;
  isDarkMode = false;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    this.doctorId = +this.route.snapshot.params['id'];
    this.service.getById(this.doctorId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => this.doctor = data);
  }

  getRoleName(role: number): string {
    switch (role) {
      case 0: return 'AdminDoctor';
      case 1: return 'Doctor';
      case 2: return 'Moderator';
      case 3: return 'Patient';
      default: return 'Unknown';
    }
  }

  goBack() {
    this.router.navigate(['/dashboard/doctor']);
  }
}
