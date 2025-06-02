import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// This interface matches the form model we use in frontend
export interface DoctorFormModel {
  fullName: string;
  email: string;
  password: string;
  role: number;  // 0 = AdminDoctor, 1 = Doctor, 2 = Moderator, 3 = Patient
}

// This interface matches the response from backend
export interface DoctorDto {
  id: number;
  fullName: string;
  email: string;
  role: number;
}

@Injectable({ providedIn: 'root' })
export class DoctorApiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/Doctor`;

  // Get paginated list of doctors
  getAll(): Observable<{ items: DoctorDto[], totalCount: number }> {
    return this.http.get<{ items: DoctorDto[], totalCount: number }>(this.baseUrl, { withCredentials: true });
  }

  // Get single doctor by ID
  getById(id: number): Observable<DoctorDto> {
    return this.http.get<DoctorDto>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  // Create new doctor
  create(doctor: DoctorFormModel): Observable<DoctorDto> {
    return this.http.post<DoctorDto>(this.baseUrl, doctor, { withCredentials: true });
  }

  // Update existing doctor
  update(id: number, doctor: DoctorFormModel): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, doctor, { withCredentials: true });
  }

  // Delete doctor
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }
}
