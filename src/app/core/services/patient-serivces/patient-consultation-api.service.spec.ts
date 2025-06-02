import { TestBed } from '@angular/core/testing';

import { PatientConsultationApiService } from './patient-consultation-api.service';

describe('PatientConsultationApiService', () => {
  let service: PatientConsultationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientConsultationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
