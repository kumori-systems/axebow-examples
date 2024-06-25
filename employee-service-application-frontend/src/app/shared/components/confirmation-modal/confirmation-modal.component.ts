import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmationModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  closeAccept() {
    this.dialogRef.close(true);
  }

  closeReject() {
    this.dialogRef.close(false);
  }

}
