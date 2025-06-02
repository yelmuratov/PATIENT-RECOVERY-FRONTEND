import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface RehabilitationProgress {
  id: number;
  progressNote: string;
}

@Injectable({ providedIn: 'root' })
export class PatientRehabilitationApiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/Rehabilitation/progress`;

  getProgress(patientId: number): Observable<RehabilitationProgress> {
    return this.http.get<RehabilitationProgress>(`${this.baseUrl}/${patientId}`, { withCredentials: true });
  }
}
