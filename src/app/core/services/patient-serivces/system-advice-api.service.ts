import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// You will replace this later with real AI backend call

@Injectable({ providedIn: 'root' })
export class SystemAdviceService {

  getAdvice(): Observable<string> {
    // Dummy data for now, simulate AI answer
    return of(`
      Based on your recent recovery logs, symptoms and rehab plan,
      your recovery is progressing normally. Please continue your plan.
      If you feel unusual pain or symptoms, contact your doctor.
    `);
  }
}
