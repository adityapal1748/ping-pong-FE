import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.css']
})
export class GameModalComponent implements OnInit {
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  otp: any;
  length = 8
  config:any
  
  constructor(public dialogRef: MatDialogRef<GameModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.config = {
      allowNumbersOnly: true,
      length: this.length,
      isPasswordInput: false,
      disableAutoFocus: false,
      placeholder: '',
      inputStyles: {
        'width': '25px',
        'height': '25px'
      }
    };
  }
  onOtpChange(otp:any) {
    this.otp = otp;
  }
  onClose(): void {
    this.dialogRef.close();
  }

}
