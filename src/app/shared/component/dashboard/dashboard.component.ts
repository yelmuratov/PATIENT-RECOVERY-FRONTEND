// src/app/shared/component/dashboard/dashboard.component.ts
import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { ThemeService } from '../../../core/services/theme.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent implements OnInit {
  user: any = null;
  role: string = '';
  stats: any = {};
  isLoading = true;
  isDarkMode = false;

  private destroyRef = inject(DestroyRef);

  constructor(
    private http: HttpClient,
    private theme: ThemeService
  ) {}

  ngOnInit(): void {
    this.theme.loadTheme();

    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((dark) => {
        this.isDarkMode = dark;
      });

    this.http.get<any>(`${environment.apiUrl}/Auth/me`, { withCredentials: true }).subscribe({
      next: (user) => {
        this.user = user;
        this.role = user.role;

        if (this.role === 'Patient' && user.doctor) {
          this.fetchDoctorName(user.doctor);
        }

        this.loadDashboardData(this.role);
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  toggleDarkMode(): void {
    this.theme.toggleTheme();
  }

  fetchDoctorName(doctorId: number): void {
    this.http.get<any>(`${environment.apiUrl}/Doctor/${doctorId}`, { withCredentials: true }).subscribe({
      next: (doctor) => {
        this.stats.doctorName = doctor.fullName;
      },
      error: () => {
        this.stats.doctorName = 'Unavailable';
      }
    });
  }

  loadDashboardData(role: string): void {
    if (role === 'AdminDoctor') {
      Promise.all([
        this.http.get<any>(`${environment.apiUrl}/Doctor`, { withCredentials: true }).toPromise(),
        this.http.get<any>(`${environment.apiUrl}/Patient`, { withCredentials: true }).toPromise()
      ]).then(([doctors, patients]) => {
        this.stats.totalDoctors = doctors?.items?.length || 0;
        this.stats.totalPatients = patients?.items?.length || 0;
        this.isLoading = false;
      }).catch(() => this.isLoading = false);
    }

    else if (role === 'Doctor') {
      const doctorId = this.user.id;
      Promise.all([
        this.http.get<any>(`${environment.apiUrl}/Patient/doctor/${doctorId}`, { withCredentials: true }).toPromise(),
        this.http.get<any>(`${environment.apiUrl}/RecoveryLog/doctor/${doctorId}`, { withCredentials: true }).toPromise()
      ]).then(([patients, logs]) => {
        this.stats.assignedPatients = patients?.length || 0;
        this.stats.openConsultations = logs?.filter((log: any) => log?.isEmergency)?.length || 0;
        this.isLoading = false;
      }).catch(() => this.isLoading = false);
    }

    else if (role === 'Patient') {
      const patientId = this.user.id;
      this.http.get<any>(`${environment.apiUrl}/Rehabilitation/progress/${patientId}`, { withCredentials: true }).subscribe({
        next: (progress) => {
          this.stats.activePlan = progress?.progressNote || 'No active plan';
          this.isLoading = false;
        },
        error: () => {
          this.stats.activePlan = 'Unavailable';
          this.isLoading = false;
        }
      });
    }

    else {
      // For Moderator or unsupported role
      this.isLoading = false;
    }
  }
}
