import { TestBed } from '@angular/core/testing';

import { CurrentAppsService } from './current-apps.service';

describe('CurrentAppsService', () => {
  let service: CurrentAppsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentAppsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
