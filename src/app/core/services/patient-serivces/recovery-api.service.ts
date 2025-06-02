import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface RecoveryLog {
  id: number;
  temperature: number;
  heartRate: number;
  systolic: number;
  diastolic: number;
  painLevel: number;
  timestamp: string;
  description: string;
  isEmergency: boolean;
}

@Injectable({ providedIn: 'root' })
export class PatientRecoveryApiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/RecoveryLog`;

  getPatientLogs(patientId: number): Observable<RecoveryLog[]> {
    return this.http.get<RecoveryLog[]>(`${this.baseUrl}/patient/${patientId}`, { withCredentials: true });
  }

  getLogById(id: number): Observable<RecoveryLog> {
    return this.http.get<RecoveryLog>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }
}
