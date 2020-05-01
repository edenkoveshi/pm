import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//import db from '../../assets/db.json';
import { DataService } from '../search-data.service'

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
 // db: any;
  //domain: string;
  //@Output() domainChangeEvent = new EventEmitter<string>();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    //this.db = db
  }

  changeDomain(e) {
    let domain = e.target.value;
    //this.domainChangeEvent.emit(this.domain);
    this.dataService.setChosenDomain(domain);
  }
}
