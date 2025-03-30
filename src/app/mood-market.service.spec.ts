import { TestBed } from '@angular/core/testing';

import { MoodMarketService } from './mood-market.service';

describe('MoodMarketService', () => {
  let service: MoodMarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoodMarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
