import { TestBed } from '@angular/core/testing';

import { OhlcDataService } from './ohlc-data.service';

describe('OhlcDataService', () => {
  let service: OhlcDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OhlcDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
