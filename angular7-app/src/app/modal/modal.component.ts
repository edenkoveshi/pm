import {Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../data.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  //private form: FormGroup;
  private serverData;
  private keys;

  constructor(private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.serverData = data;
      this.keys = Object.keys(this.serverData);
  }

  ngOnInit(): void {
  }

  save() {
    //this.dialogRef.close(this.form.value);
}

close() {
    this.dialogRef.close();
}
}
