import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Auth/login`, credentials);
  }

  me(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/Auth/me`);
  }

  logout(): Observable<any> {
    console.log("Log our service called");
    return this.http.post(`${environment.apiUrl}/Auth/logout`, {});
  }

  setToken(token: string) {
    this.cookies.set('jwt', token, { path: '/', secure: true, sameSite: 'Lax' });
  }

  getToken(): string {
    return this.cookies.get('jwt');
  }

  clearToken() {
    this.cookies.delete('jwt', '/');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
