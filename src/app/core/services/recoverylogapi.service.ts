import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface RecoveryLogDto {
  id?: number;
  temperature: number;
  heartRate: number;
  systolic: number;
  diastolic: number;
  painLevel: number;
  timestamp: string;
  description?: string;
  isEmergency: boolean;
  patientId: number;
  doctorId: number;
}

@Injectable({ providedIn: 'root' })
export class RecoveryLogApiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/RecoveryLog`;

  // Get all logs
  getAll(): Observable<RecoveryLogDto[]> {
    return this.http.get<RecoveryLogDto[]>(`${this.baseUrl}/all`, { withCredentials: true });
  }

  // Get logs by patient
  getByPatient(patientId: number): Observable<RecoveryLogDto[]> {
    return this.http.get<RecoveryLogDto[]>(`${this.baseUrl}/patient/${patientId}`, { withCredentials: true });
  }

  // Get logs by doctor
  getByDoctor(doctorId: number): Observable<RecoveryLogDto[]> {
    return this.http.get<RecoveryLogDto[]>(`${this.baseUrl}/doctor/${doctorId}`, { withCredentials: true });
  }

  // Get single log by ID
  getById(id: number): Observable<RecoveryLogDto> {
    return this.http.get<RecoveryLogDto>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  // Create log for patient
  create(patientId: number, log: RecoveryLogDto): Observable<RecoveryLogDto> {
    return this.http.post<RecoveryLogDto>(`${this.baseUrl}/${patientId}`, log, { withCredentials: true });
  }

  // Update log
  update(id: number, log: RecoveryLogDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, log, { withCredentials: true });
  }

  // Delete log
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }
}
