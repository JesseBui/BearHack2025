import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodMarketPopupComponent } from './mood-market-popup.component';

describe('MoodMarketPopupComponent', () => {
  let component: MoodMarketPopupComponent;
  let fixture: ComponentFixture<MoodMarketPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodMarketPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodMarketPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
