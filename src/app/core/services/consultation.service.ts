import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AskConsultationDto {
  symptomDescription: string;
}

export interface ReplyConsultationDto {
  doctorReply: string;
}

export interface ConsultationDto {
  id: number;
  patientId: number;
  doctorId: number;
  symptomDescription: string;
  doctorReply: string;
  // You can extend this if backend provides more fields.
}

@Injectable({ providedIn: 'root' })
export class ConsultationApiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/Consultation`;

  // POST /ask/{patientId}
  askConsultation(patientId: number, payload: AskConsultationDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/ask/${patientId}`, payload, { withCredentials: true });
  }

  // GET /patient/{patientId}
  getByPatient(patientId: number): Observable<ConsultationDto[]> {
    return this.http.get<ConsultationDto[]>(`${this.baseUrl}/patient/${patientId}`, { withCredentials: true });
  }

  // GET /{id}
  getById(id: number): Observable<ConsultationDto> {
    return this.http.get<ConsultationDto>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  // PUT /reply/{consultationId}
  replyConsultation(consultationId: number, payload: ReplyConsultationDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/reply/${consultationId}`, payload, { withCredentials: true });
  }
}
