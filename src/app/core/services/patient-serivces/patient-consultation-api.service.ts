// src/app/core/services/patient-serivces/patient-consultation-api.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

export interface Consultation {
  id: number;
  patientId: number;
  symptomDescription: string;
  doctorReply: string | null;
  systemAdvice: string | null;
  escalatedToDoctor: boolean;
  createdAt: string;
}

export interface AskConsultationDto {
  symptomDescription: string;
}

@Injectable({ providedIn: 'root' })
export class PatientConsultationApiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/Consultation`;

  askConsultation(patientId: number, data: AskConsultationDto): Observable<Consultation> {
    return this.http.post<Consultation>(
      `${this.baseUrl}/ask/${patientId}`,
      data,
      { withCredentials: true }
    );
  }
}
