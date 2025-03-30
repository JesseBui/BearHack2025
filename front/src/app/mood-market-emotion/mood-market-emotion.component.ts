// mood-market-emotion.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material-ui.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MoodMarketPopupComponent } from '../mood-market-popup/mood-market-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MoodMarketService, OutputMoodMarket } from '../mood-market.service'; // Import the service

class MoodMarketData {
  moodMarketName!: String;
  moodMarketEmotion!: String;
}

@Component({
  selector: 'app-mood-market-emotion',
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './mood-market-emotion.component.html',
  styleUrl: './mood-market-emotion.component.css'
})
export class MoodMarketEmotionComponent implements OnInit {

  moodMarketEmotion = ["Happy", "Sad", "Cautious", "Random", "Hopeful"];

  // ... (getImageUrl method remains the same)

  moodMarketStartUp: MoodMarketData = {
    moodMarketName: "Andrew",
    moodMarketEmotion: this.moodMarketEmotion[0],
  }

  moodMarketForm!: FormGroup;

  moodMarketFormData!: string;

  outputMoodMarket!: OutputMoodMarket; // Type it correctly

  constructor(public dialog: MatDialog, private moodMarketService: MoodMarketService) { } // Inject the service

  ngOnInit() {
    this.moodMarketForm = new FormGroup({
      'moodMarketName': new FormControl(this.moodMarketStartUp.moodMarketName),
      'moodMarketEmotion': new FormControl(this.moodMarketStartUp.moodMarketEmotion),
      'moodMarketDate': new FormControl(new Date())
    });
  }

  getImageUrl(emotion: string): string {
    switch (emotion) {
      case 'Happy':
        return '../images/happy.png'; // Replace with actual path
      case 'Sad':
        return '../images/sad.png'; // Replace with actual path
      case 'Cautious':
        return '../images/cautious.png'; // Replace with actual path
      case 'Random':
        return '../images/random.png'; // Replace with actual path
      case 'Hopeful':
          return '../images/hopeful.png'; //Replace with actual path
      default:
        return ''; // Default image or empty string
    }
  }

  moodMarketSubmit() {
    this.outputMoodMarket = {
      moodMarketName: this.moodMarketForm.value.moodMarketName,
      moodMarketEmotion: this.moodMarketForm.value.moodMarketEmotion,
      moodMarketDate: this.moodMarketForm.value.moodMarketDate,
    };

    // Use the service to share the data
    this.moodMarketService.setMoodMarketData(this.outputMoodMarket);

    const dialogRef = this.dialog.open(MoodMarketPopupComponent, { data: this.outputMoodMarket, width: '600px' });
  }
}