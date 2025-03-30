import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodMarketHeaderComponent } from './mood-market-header.component';

describe('MoodMarketHeaderComponent', () => {
  let component: MoodMarketHeaderComponent;
  let fixture: ComponentFixture<MoodMarketHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodMarketHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodMarketHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
