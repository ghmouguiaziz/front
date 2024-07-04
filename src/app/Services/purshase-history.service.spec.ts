import { TestBed } from '@angular/core/testing';

import { PurshaseHistoryService } from './purshase-history.service';

describe('PurshaseHistoryService', () => {
  let service: PurshaseHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurshaseHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
