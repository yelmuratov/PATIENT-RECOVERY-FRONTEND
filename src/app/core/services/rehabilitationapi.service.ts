import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// DTOs
export interface CreateRehabilitationPlanDto {
  doctorId: number;
  plan: string;
}

export interface UpdateRehabilitationPlanDto {
  plan: string;
}

export interface UpdateRehabilitationProgressDto {
  progressNote: string;
}

@Injectable({ providedIn: 'root' })
export class RehabilitationApiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/Rehabilitation`;

  // Create plan for patient
  createPlan(patientId: number, dto: CreateRehabilitationPlanDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/plan/${patientId}`, dto, { withCredentials: true });
  }

  // Update plan by id
  updatePlan(planId: number, dto: UpdateRehabilitationPlanDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/plan/${planId}`, dto, { withCredentials: true });
  }

  // Delete plan
  deletePlan(planId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/plan/${planId}`, { withCredentials: true });
  }

  // Get patient progress
  getProgressByPatient(patientId: number): Observable<UpdateRehabilitationProgressDto> {
    return this.http.get<UpdateRehabilitationProgressDto>(`${this.baseUrl}/progress/${patientId}`, { withCredentials: true });
  }

  // Update progress
  updateProgress(progressId: number, dto: UpdateRehabilitationProgressDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/progress/${progressId}`, dto, { withCredentials: true });
  }
}
