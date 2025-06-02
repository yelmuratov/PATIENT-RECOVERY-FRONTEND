import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// When you have backend API, replace with real HTTP calls

export interface Prescription {
  id: number;
  medication: string;
  dosage: string;
  frequency: string;
  issuedDate: string;
}

@Injectable({ providedIn: 'root' })
export class PatientPrescriptionApiService {

  // Dummy data for now
  getPrescriptions(): Observable<Prescription[]> {
    return of([
      {
        id: 1,
        medication: 'Paracetamol',
        dosage: '500mg',
        frequency: 'Twice a day',
        issuedDate: '2024-06-01'
      },
      {
        id: 2,
        medication: 'Ibuprofen',
        dosage: '400mg',
        frequency: 'Once a day',
        issuedDate: '2024-05-25'
      }
    ]);
  }
}
