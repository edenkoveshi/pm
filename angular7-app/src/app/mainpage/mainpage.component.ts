import { Component, OnInit } from '@angular/core';
import { PmTableComponent } from '../pm-table/pm-table.component'
import { NavbarComponent } from '../navbar/navbar.component'
import { SelectComponent } from '../select/select.component'

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
