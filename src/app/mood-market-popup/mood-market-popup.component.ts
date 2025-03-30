import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../modules/material-ui.module';
import { CommonModule } from '@angular/common';
import { MoodMarketEmotionComponent } from '../mood-market-emotion/mood-market-emotion.component';

@Component({
  selector: 'app-mood-market-popup',
  imports: [CommonModule, MaterialModule],
  templateUrl: './mood-market-popup.component.html',
  styleUrl: './mood-market-popup.component.css'
})
export class MoodMarketPopupComponent {
  constructor(public dialogRef: MatDialogRef<MoodMarketEmotionComponent>, 
    @Inject(MAT_DIALOG_DATA) public outputMoodMarket: any) {}

  close() {
    this.dialogRef.close();
  }
}
