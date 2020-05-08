import {Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../data.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
  }

  ngOnInit(): void {
  }

  save() {
    //this.dialogRef.close(this.form.value);
    //this.dialogRef.close();
}

close() {
    this.dialogRef.close();
}
}


@Component({
  selector: 'app-server-modal',
  templateUrl: './newservermodal.component.html',
})
export class NewServerModalComponent extends ModalComponent{
  private newServerData = {
    Name: "",
    OS: "",
    App: "",
    PMDeployed:  false,
    RebootPerformed:  false,
    PlannedRebootTime:  "",
    Domain:  ""
  }

  constructor(private dataService: DataService,private _dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) _data){
      super(_dialogRef,_data)
      this._dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result)
      });
    };


  afterClosed(result){
    console.log(result);
  }
}
