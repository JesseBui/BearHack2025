// stock-recommendation.component.ts
import { Component, OnInit } from '@angular/core';
import { MoodMarketService, OutputMoodMarket } from '../mood-market.service'; // Import the service
import { StockRecommendationService } from '../mood-market-recommendation.service';// Assuming you have a StockService

@Component({
  selector: 'app-mood-market-stock',
  templateUrl: './mood-market-stock.component.html',
  styleUrls: ['./mood-market-stock.component.css']
})
export class StockRecommendationComponent implements OnInit {
  moodMarketData: OutputMoodMarket | null = null;
  recommendations: any; // Assuming recommendations can be of any type

  constructor(private moodMarketService: MoodMarketService, private stockService: StockRecommendationService) { }

  ngOnInit() {
    this.moodMarketService.currentMoodMarketData.subscribe(data => {
      this.moodMarketData = data;
      if (this.moodMarketData) {
        // Use the moodMarketData to fetch stock recommendations
        this.fetchRecommendations(this.moodMarketData.moodMarketEmotion);
      }
    });
  }

  fetchRecommendations(emotion: string) {
    this.stockService.getStockRecommendationsByMood(emotion).subscribe({
      next: (data) => {
        this.recommendations = data;
      },
      error: (error) => {
        console.error('Error fetching recommendations:', error);
        this.recommendations = 'Failed to fetch recommendations.';
      },
      complete: () => {
        console.log('Recommendations fetched successfully.');
      }
    });
  }
}