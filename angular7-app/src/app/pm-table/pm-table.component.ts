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
  selectedDomain: string;
  numServersInSelectedDomain: number = 1;
  statsInDomain: number[] = [0, 0, 0];

  constructor() {
    console.log(db)
  }

  ngOnInit() {
    this.db = db;
    this.servers = this.db.Servers;
    //this.filterServers()
    this.sortServers();
    this.keys = Object.keys(this.servers[0]);
  }

  updateList(id: number, property: string, event: any): void {
    const editField = event.target.textContent;
    window.alert(editField)
  }

  changeValue(id: number, property: string, event: any): void {
    this.editField = event.target.textContent;
  }

  sortServers(): void {
    this.servers.sort((s1, s2) => s1.App.localeCompare(s2.App));
  }

  getServers(): Array<any> {
    return this.servers;
  }

  setServers(servers: Array<any>): void {
    this.servers = servers;
    this.sortServers();
  }

  filterServers(filter: (s1) => boolean): Array<any> {
    return this.db.Servers.filter(filter);
  }

  filterByDomain(domain: string): void {
    this.selectedDomain = domain;
    this.servers = this.filterServers(s => {
      return s.Domain === domain;
    });
    this.numServersInSelectedDomain = this.servers.length;
    this.statsInDomain = this.getServerStatistics(domain);

  }

  getServerStatistics(domain: string): number[] {
    let UndeployedServers = this.filterServers(s => s.Domain == domain && !s.PMDeployed);
    let UnrebootedServers = this.filterServers(s => s.Domain == domain && s.PMDeployed && !s.RebootPerformed);
    let Finished = this.filterServers(s => s.Domain == domain && s.PMDeployed && s.RebootPerformed);
    return [UndeployedServers.length, UnrebootedServers.length, Finished.length]
  }

  getProgressBarStyle(num: number) {
    let colors: string[] = ["#2AB025", "#EC7423", "#EC2323"];
    return {
      'width': (this.statsInDomain[num] / this.numServersInSelectedDomain) * 100 + '%',
      'background-color': colors[num]
    }
  }

}
