import { TestBed } from '@angular/core/testing';

import { PasswordcheckService } from './passwordcheck.service';

describe('PasswordcheckService', () => {
  let service: PasswordcheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordcheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
