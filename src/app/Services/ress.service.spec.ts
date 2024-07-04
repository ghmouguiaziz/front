import { TestBed } from '@angular/core/testing';

import { RessService } from './ress.service';

describe('RessService', () => {
  let service: RessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
