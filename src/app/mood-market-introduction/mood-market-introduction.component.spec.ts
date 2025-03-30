import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodMarketIntroductionComponent } from './mood-market-introduction.component';

describe('MoodMarketIntroductionComponent', () => {
  let component: MoodMarketIntroductionComponent;
  let fixture: ComponentFixture<MoodMarketIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodMarketIntroductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodMarketIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
