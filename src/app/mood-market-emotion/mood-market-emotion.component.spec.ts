import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodMarketEmotionComponent } from './mood-market-emotion.component';

describe('MoodMarketEmotionComponent', () => {
  let component: MoodMarketEmotionComponent;
  let fixture: ComponentFixture<MoodMarketEmotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodMarketEmotionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodMarketEmotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
