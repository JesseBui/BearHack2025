import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material-ui.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MoodMarketPopupComponent } from '../mood-market-popup/mood-market-popup.component';
import { MatDialog } from '@angular/material/dialog';

class MoodMarketData{
  moodMarketName !: String;
  moodMarketEmotion !: String;
}

class OutputMoodMarket{
  moodMarketName !: String;
  moodMarketEmotion !: String;
  moodMarketDate !: String;
}

@Component({
  selector: 'app-mood-market-emotion',
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './mood-market-emotion.component.html',
  styleUrl: './mood-market-emotion.component.css'
})
export class MoodMarketEmotionComponent {

  moodMarketEmotion = ["Happy", "Sad", "Conscious", "Random", "Hopeful"];

  getImageUrl(emotion: string): string {
    switch (emotion) {
      case 'Happy':
        return '../images/happy.png'; // Replace with actual path
      case 'Sad':
        return '../images/sad.png'; // Replace with actual path
      case 'Conscious':
        return '../images/conscious.png'; // Replace with actual path
      case 'Random':
        return '../images/random.png'; // Replace with actual path
      case 'Hopeful':
          return '../images/hopeful.png'; //Replace with actual path
      default:
        return ''; // Default image or empty string
    }
  }

  moodMarketStartUp: MoodMarketData = {
    moodMarketName : "Andrew",
    moodMarketEmotion : this.moodMarketEmotion[0],
  }

  moodMarketForm!: FormGroup;

  moodMarketFormData !: string;

  ngOnInit() {
    this.moodMarketForm = new FormGroup({
      // KEY - userdefined: new FormControl(default)
      'moodMarketName': new FormControl(this.moodMarketStartUp.moodMarketName),
      'moodMarketEmotion':new FormControl(this.moodMarketStartUp.moodMarketEmotion),
      'moodMarketDate': new FormControl(new Date())
    })
  }

  outputMoodMarket!: OutputMoodMarket

  constructor(public dialog: MatDialog) { }

  moodMarketSubmit() { 
    this.outputMoodMarket = {
      moodMarketName: this.moodMarketForm.value.moodMarketName,
      moodMarketEmotion: this.moodMarketForm.value.moodMarketEmotion,
      moodMarketDate: this.moodMarketForm.value.moodMarketDate,
    }

    const dialogRef = this.dialog.open(MoodMarketPopupComponent, {data: this.outputMoodMarket, width: '600px'});
  }

  
}
