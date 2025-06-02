import { TestBed } from '@angular/core/testing';

import { PatientPrescriptionApiService } from './patient-prescription-api.service';

describe('PatientPrescriptionApiService', () => {
  let service: PatientPrescriptionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientPrescriptionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
