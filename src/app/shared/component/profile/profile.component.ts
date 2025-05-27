import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { ThemeService } from '../../../core/services/theme.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
})
export default class ProfileComponent implements OnInit {
  user: any = null;
  role: string = '';
  isDarkMode = false;
  isLoading = true;
  doctorName: string | null = null;

  private destroyRef = inject(DestroyRef);

  constructor(
    private http: HttpClient,
    private theme: ThemeService
  ) {}

  ngOnInit(): void {
    this.theme.loadTheme();

    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((dark) => this.isDarkMode = dark);

    this.http.get<any>(`${environment.apiUrl}/Auth/me`, { withCredentials: true }).subscribe({
      next: (res) => {
        this.user = res;
        this.role = res.role;
        this.isLoading = false;

        if (this.role === 'Patient' && res.doctor) {
          this.fetchDoctorName(res.doctor);
        }
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  private fetchDoctorName(doctorId: number): void {
    this.http.get<any>(`${environment.apiUrl}/Doctor/${doctorId}`, { withCredentials: true }).subscribe({
      next: (doctor) => {
        this.doctorName = doctor.fullName;
      },
      error: () => {
        this.doctorName = 'Unavailable';
      }
    });
  }
}
