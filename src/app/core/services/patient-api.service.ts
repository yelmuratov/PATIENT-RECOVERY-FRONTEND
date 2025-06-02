import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// DTO returned from backend
export interface PatientDto {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  role: number;
  doctorId: number;
}

// Form model used in frontend for Create/Update
export interface PatientFormModel {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
  role: number;
  doctorId: number;
}

@Injectable({ providedIn: 'root' })
export class PatientApiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/Patient`;

  // Get all patients (paged)
  getAll(): Observable<{ items: PatientDto[], totalCount: number }> {
    return this.http.get<{ items: PatientDto[], totalCount: number }>(this.baseUrl, { withCredentials: true });
  }

  // Get single patient by ID
  getById(id: number): Observable<PatientDto> {
    return this.http.get<PatientDto>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  // Create new patient
  create(patient: PatientFormModel): Observable<PatientDto> {
    return this.http.post<PatientDto>(this.baseUrl, patient, { withCredentials: true });
  }

  // Update existing patient
  update(id: number, patient: PatientFormModel): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, patient, { withCredentials: true });
  }

  // Delete patient
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  // Get patients assigned to a doctor
  getByDoctorId(doctorId: number): Observable<PatientDto[]> {
    return this.http.get<PatientDto[]>(`${this.baseUrl}/doctor/${doctorId}`, { withCredentials: true });
  }
}
