// src/app/shared/component/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent {
  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) {}

  logout() {
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
}
