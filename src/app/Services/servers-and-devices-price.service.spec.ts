import { TestBed } from '@angular/core/testing';

import { ServersAndDevicesPriceService } from './servers-and-devices-price.service';

describe('ServersAndDevicesPriceService', () => {
  let service: ServersAndDevicesPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServersAndDevicesPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
