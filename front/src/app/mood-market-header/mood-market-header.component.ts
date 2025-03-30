import { Component } from '@angular/core';
import { MaterialModule } from '../modules/material-ui.module';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router'; 

@Component({
  selector: 'app-mood-market-header',
  imports: [MaterialModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './mood-market-header.component.html',
  styleUrl: './mood-market-header.component.css'
})
export class MoodMarketHeaderComponent {

}
