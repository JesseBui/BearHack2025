import { Routes } from '@angular/router';
import { MoodMarketIntroductionComponent } from './mood-market-introduction/mood-market-introduction.component';
import { MoodMarketEmotionComponent } from './mood-market-emotion/mood-market-emotion.component';
import { StockRecommendationComponent } from './mood-market-stock/mood-market-stock.component';

export const routes: Routes = [
    {path: "moodMarketIntroduction", component: MoodMarketIntroductionComponent},
    {path: "moodMarketEmotion", component: MoodMarketEmotionComponent},
    {path: "moodMarketStock", component: StockRecommendationComponent},
    {path: "", redirectTo: '/moodMarketIntroduction', pathMatch: 'full'}
];
