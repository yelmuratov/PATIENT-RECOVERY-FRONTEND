import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthInitService {
  constructor(private http: HttpClient) {}

  checkAuth(): Promise<void> {
    return new Promise((resolve) => {
      this.http.get(`${environment.apiUrl}/Auth/me`, { withCredentials: true })
        .subscribe({
          next: () => resolve(),
          error: () => resolve()
        });
    });
  }
}
