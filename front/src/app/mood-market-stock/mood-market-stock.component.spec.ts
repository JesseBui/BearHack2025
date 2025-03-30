import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodMarketStockComponent } from './mood-market-stock.component';

describe('MoodMarketStockComponent', () => {
  let component: MoodMarketStockComponent;
  let fixture: ComponentFixture<MoodMarketStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodMarketStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodMarketStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
