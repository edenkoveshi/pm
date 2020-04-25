import { Component, OnInit } from '@angular/core';
import db from '../../assets/db.json';

@Component({
  selector: 'app-pm-table',
  templateUrl: './pm-table.component.html',
  styleUrls: ['./pm-table.component.css'],
})
export class PmTableComponent implements OnInit {
  db: any;
  servers: Array<any>; //List of servers that will be DISPLAYED
  keys: string[];
  editField: string;

  constructor() {
    console.log(db)
  }

  ngOnInit() {
    this.db = db;
    this.servers = this.db.servers;
    //this.filterServers()
    this.sortServers();
    this.keys = Object.keys(this.servers[0]);
  }

  updateList(id: number, property: string, event: any):void {
    const editField = event.target.textContent;
    window.alert(editField)
  }

  changeValue(id: number, property: string, event: any):void {
    this.editField = event.target.textContent;
  }

  sortServers(): void {
    this.servers.sort((s1, s2) => s1.App.localeCompare(s2.App));
  }

  getServers(): Array<any>{
    return this.servers;
  }

  setServers(servers: Array<any>): void {
    this.servers = servers;
    this.sortServers();
  }

  filterServers(filter: (s1) => boolean): void {
    this.servers = this.db.servers.filter(filter);
  }

  filterByDomain(domain: string): void {
    this.filterServers(s => {
      return s.Domain === domain;
    });
  }


}
