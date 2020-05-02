import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service'

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  changeDomain(e) {
    let domain = e.target.value;
    this.dataService.setChosenDomain(domain);
  }
}
