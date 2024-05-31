import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-option-modal',
  templateUrl: './option-modal.component.html',
  styleUrl: './option-modal.component.css'
})
export class OptionModalComponent {
  constructor(
    public dialogRef: MatDialogRef<OptionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    this.dialogRef.close(true);
  }
}