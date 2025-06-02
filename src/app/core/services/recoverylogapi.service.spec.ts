import { TestBed } from '@angular/core/testing';

import { RecoverylogapiService } from './recoverylogapi.service';

describe('RecoverylogapiService', () => {
  let service: RecoverylogapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoverylogapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
