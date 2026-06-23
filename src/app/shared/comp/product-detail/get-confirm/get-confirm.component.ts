import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-confirm',
  templateUrl: './get-confirm.component.html',
  styleUrls: ['./get-confirm.component.scss']
})
export class GetConfirmComponent implements OnInit {
  getMsg !: string

  constructor(
    private _matRef: MatDialogRef<GetConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) msg: string
  ) { this.getMsg = msg }

  ngOnInit(): void {
  }

  onClose(flag: boolean) {
    this._matRef.close(flag)
  }

}
