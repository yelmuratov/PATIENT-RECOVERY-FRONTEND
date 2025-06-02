import { TestBed } from '@angular/core/testing';

import { RecoveryApiService } from './recovery-api.service';

describe('RecoveryApiService', () => {
  let service: RecoveryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoveryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
