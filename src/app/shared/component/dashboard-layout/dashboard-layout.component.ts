// src/app/features/dashboard/dashboard-layout.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
import { ThemeService } from '../../../core/services/theme.service';

enum UserRole {
  AdminDoctor = 'AdminDoctor',
  Moderator = 'Moderator',
  Doctor = 'Doctor',
  Patient = 'Patient'
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-layout.component.html'
})
export class DashboardLayoutComponent implements OnInit {
  isDarkMode = false;
  user: any = null;
  userRole: UserRole | null = null;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private theme: ThemeService
  ) {}

  ngOnInit(): void {
    this.theme.loadTheme();
    this.isDarkMode = this.theme.isDark();

    this.http.get<any>(`${environment.apiUrl}/Auth/me`, { withCredentials: true }).subscribe({
      next: (res) => {
        this.user = res;
        this.userRole = res?.role as UserRole;
      },
      error: () => {
        this.user = null;
        this.userRole = null;
      }
    });
  }

  toggleDarkMode(): void {
    this.theme.toggleTheme();
    this.isDarkMode = this.theme.isDark();
  }

  logout(): void {
    this.http.post(`${environment.apiUrl}/Auth/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.cookie.delete('jwt', '/');
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.cookie.delete('jwt', '/');
        this.router.navigate(['/auth/login']);
      }
    });
  }

  get navClass(): string {
    return this.isDarkMode
      ? 'block px-4 py-2 rounded-md transition text-gray-200 hover:bg-gray-800'
      : 'block px-4 py-2 rounded-md transition text-gray-700 hover:bg-gray-100';
  }

  get isAdminDoctor(): boolean {
    return this.userRole === UserRole.AdminDoctor;
  }

  get isModerator(): boolean {
    return this.userRole === UserRole.Moderator;
  }

  get isDoctor(): boolean {
    return this.userRole === UserRole.Doctor;
  }

  get isPatient(): boolean {
    return this.userRole === UserRole.Patient;
  }
}
