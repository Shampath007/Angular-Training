import { TestBed } from '@angular/core/testing';

import { SignalserviceService } from './signalservice.service';

describe('SignalserviceService', () => {
  let service: SignalserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
