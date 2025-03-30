import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodMarketFooterComponent } from './mood-market-footer.component';

describe('MoodMarketFooterComponent', () => {
  let component: MoodMarketFooterComponent;
  let fixture: ComponentFixture<MoodMarketFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodMarketFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodMarketFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
