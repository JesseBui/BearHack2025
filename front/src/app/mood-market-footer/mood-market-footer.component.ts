import { Component } from '@angular/core';

@Component({
  selector: 'app-mood-market-footer',
  imports: [],
  templateUrl: './mood-market-footer.component.html',
  styleUrl: './mood-market-footer.component.css'
})
export class MoodMarketFooterComponent {
  currentYear: number = new Date().getFullYear();
}
