import { Component } from '@angular/core';
import { MaterialModule } from '../modules/material-ui.module';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router'; 

@Component({
  selector: 'app-mood-market-introduction',
  imports: [MaterialModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './mood-market-introduction.component.html',
  styleUrl: './mood-market-introduction.component.css'
})
export class MoodMarketIntroductionComponent {

}
