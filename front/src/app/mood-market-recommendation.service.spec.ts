import { TestBed } from '@angular/core/testing';

import { MoodMarketRecommendationService } from './mood-market-recommendation.service';

describe('MoodMarketRecommendationService', () => {
  let service: MoodMarketRecommendationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoodMarketRecommendationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
