import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Consultation {
  id: number;
  symptomDescription: string;
  doctorReply: string;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class PatientConsultationApiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/Consultation`;

  getPatientConsultations(patientId: number): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.baseUrl}/patient/${patientId}`, { withCredentials: true });
  }
}
