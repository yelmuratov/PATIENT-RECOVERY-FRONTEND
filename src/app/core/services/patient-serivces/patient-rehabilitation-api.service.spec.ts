import { TestBed } from '@angular/core/testing';

import { PatientRehabilitationApiService } from './patient-rehabilitation-api.service';

describe('PatientRehabilitationApiService', () => {
  let service: PatientRehabilitationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientRehabilitationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
