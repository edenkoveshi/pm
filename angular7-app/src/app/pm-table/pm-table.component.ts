import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-pm-table',
  templateUrl: './pm-table.component.html',
  styleUrls: ['./pm-table.component.css'],
})

export class PmTableComponent implements OnInit {
  //db: any;
  displayServers: Array<any>; //List of servers that will be DISPLAYED
  keys: string[];
  editField: string;
  selectedDomain: string;
  numServersInSelectedDomain: number;
  statsInDomain: number[];
  showTable: boolean;
  
  constructor(private dataService: DataService,private authService:AuthService) {
  }

  ngOnInit() {
    this.displayServers = [];
    this.dataService.displayServers.subscribe(servers => {
      this.displayServers = servers;
      if (this.displayServers.length > 0) {
        this.keys = Object.keys(this.displayServers[0]);
      }
      let permittedApps = this.authService.getUserPermittedApplications(this.authService.getCurrentUser());
      if(permittedApps != "*"){
        this.displayServers = this.displayServers.filter(s => permittedApps.indexOf(s.App) != -1);
      }
      this.statsInDomain = this.getServerStatistics();
      this.sortServers();
    })
    this.statsInDomain = [0, 0, 0];
    this.numServersInSelectedDomain = 1;
  }

  updateList(id: number, property: string, event: any): void {
    const editField = event.target.textContent;
    window.alert(editField)
  }

  changeValue(id: number, property: string, event: any): void {
    this.editField = event.target.textContent;
  }

  getServerStatistics(): number[] {
    let UndeployedServers = this.displayServers.filter(s => !s.PMDeployed);
    let UnrebootedServers = this.displayServers.filter(s => s.PMDeployed && !s.RebootPerformed);
    let Finished = this.displayServers.filter(s => s.PMDeployed && s.RebootPerformed);
    this.numServersInSelectedDomain = UndeployedServers.length + UnrebootedServers.length + Finished.length
    return [UndeployedServers.length, UnrebootedServers.length, Finished.length]
  }

  getProgressBarStyle(num: number) {
    let colors: string[] = ["#EC2323", "#EC7423","#2AB025"];
    return {
      'width': (this.statsInDomain[num] / this.numServersInSelectedDomain) * 100 + '%',
      'background-color': colors[num]
    }
  }

  private sortServers(): void {
    this.displayServers.sort((s1, s2) => s1.App.localeCompare(s2.App));
  }

}
