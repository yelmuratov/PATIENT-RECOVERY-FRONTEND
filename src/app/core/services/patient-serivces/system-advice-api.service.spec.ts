import { TestBed } from '@angular/core/testing';

import { SystemAdviceApiService } from './system-advice-api.service';

describe('SystemAdviceApiService', () => {
  let service: SystemAdviceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemAdviceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
