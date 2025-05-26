import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  showPassword = false;
  form: FormGroup;
  errorMessage: string | null = null;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const token = this.cookie.get('jwt');
    if (token) {
      // Optionally verify token with a /me request before redirecting
      this.http.get(`${environment.apiUrl}/Auth/me`, { withCredentials: true }).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: () => this.isLoading = false
      });
    } else {
      this.isLoading = false;
    }
  }

  submit() {
    if (this.form.invalid) return;

    this.errorMessage = null;

    this.http.post<{ token: string }>(`${environment.apiUrl}/Auth/login`, this.form.value, {
      withCredentials: true
    }).subscribe({
      next: (res: any) => {
        if (res?.token) {
          this.cookie.set('jwt', res.token, { path: '/', secure: true, sameSite: 'Lax' });
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error?.error?.message || 'Invalid email or password.';
      }
    });
  }
}
