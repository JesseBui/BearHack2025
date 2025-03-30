import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface OutputMoodMarket {
  moodMarketName: string;
  moodMarketEmotion: string;
  moodMarketDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoodMarketService {
  private moodMarketData = new BehaviorSubject<OutputMoodMarket | null>(null); // Initial value is null
  currentMoodMarketData = this.moodMarketData.asObservable();

  setMoodMarketData(data: OutputMoodMarket) {
    this.moodMarketData.next(data);
  }
}