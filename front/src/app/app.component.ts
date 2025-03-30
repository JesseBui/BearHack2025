import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './modules/material-ui.module';
import { CommonModule } from '@angular/common';
import { MoodMarketHeaderComponent } from "./mood-market-header/mood-market-header.component";
import { MoodMarketFooterComponent } from "./mood-market-footer/mood-market-footer.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MaterialModule, MoodMarketHeaderComponent, MoodMarketFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bearhacks2025_MoodMarket';
}
