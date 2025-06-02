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

  chartData: any = null;  // CHART DATA for AdminDoctor & Moderator

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
    if (role === 'AdminDoctor' || role === 'Moderator') {
      Promise.all([
        this.http.get<any>(`${environment.apiUrl}/Doctor`, { withCredentials: true }).toPromise(),
        this.http.get<any>(`${environment.apiUrl}/Patient`, { withCredentials: true }).toPromise()
      ]).then(([doctors, patients]) => {
        this.stats.totalDoctors = doctors?.items?.length || 0;
        this.stats.totalPatients = patients?.items?.length || 0;
        this.prepareChartData(); // build chart after loading stats
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

  Promise.all([
    this.http.get<any>(`${environment.apiUrl}/RecoveryLog/patient/${patientId}`, { withCredentials: true }).toPromise(),
    this.http.get<any>(`${environment.apiUrl}/Consultation/patient/${patientId}`, { withCredentials: true }).toPromise(),
    this.http.get<any>(`${environment.apiUrl}/Rehabilitation/progress/${patientId}`, { withCredentials: true }).toPromise()
  ])
  .then(([recoveryLogs, consultations, rehabProgress]) => {
    this.stats.recoveryLogs = recoveryLogs?.length || 0;
    this.stats.consultations = consultations?.length || 0;
    this.stats.activePlan = rehabProgress?.progressNote || 'No active plan';
    this.isLoading = false;
  })
  .catch(() => {
    this.isLoading = false;
  });
}

    else {
      this.isLoading = false;
    }
  }

  private prepareChartData(): void {
    this.chartData = {
      labels: ['Doctors', 'Patients'],
      datasets: [{
        label: 'System Statistics',
        data: [this.stats.totalDoctors, this.stats.totalPatients],
        backgroundColor: ['#6366F1', '#EC4899'],
        borderRadius: 8
      }]
    };
  }
}
