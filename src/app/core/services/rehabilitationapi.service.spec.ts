import { TestBed } from '@angular/core/testing';

import { RehabilitationapiService } from './rehabilitationapi.service';

describe('RehabilitationapiService', () => {
  let service: RehabilitationapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RehabilitationapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
