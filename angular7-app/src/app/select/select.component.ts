import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import db from '../../assets/db.json';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  db: any;
  domain: string;
  @Output() domainChangeEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.db = db
  }

  changeDomain(e) {
    this.domain = e.target.value;
    this.domainChangeEvent.emit(this.domain);
  }
}
