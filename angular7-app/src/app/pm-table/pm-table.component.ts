import { Component, OnInit } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";
import { DataService } from '../data.service'
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

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
  
  constructor(private dataService: DataService,private dialog: MatDialog) {
  }

  ngOnInit() {
    //this.db = db;
    //this.dataService = new DataService();
    this.displayServers = [];
    //this.filterServers()
    //this.sortServers();
    this.dataService.chosenDomain.subscribe(domain => {
      this.selectedDomain = domain
      this.statsInDomain = this.getServerStatistics(domain);
    });
    this.dataService.displayServers.subscribe(servers => {
      this.displayServers = servers;
      if (this.displayServers.length > 0) {
        this.keys = Object.keys(this.displayServers[0]);
      }
      this.sortServers();
    })
    this.statsInDomain = [0, 0, 0];
    this.numServersInSelectedDomain = 1;
    //this.DataService.getResults()
  }

  updateList(id: number, property: string, event: any): void {
    const editField = event.target.textContent;
    window.alert(editField)
  }

  changeValue(id: number, property: string, event: any): void {
    this.editField = event.target.textContent;
  }

  /*sortServers(): void {
    this.servers.sort((s1, s2) => s1.App.localeCompare(s2.App));
  }*/

  /*getServers(): Array<any> {
    return this.dataService.getDisplayServers();
  }*/

  /*setServers(servers: Array<any>): void {
    this.servers = servers;
    this.sortServers();
  }*/

  /*filterServers(filter: (s1) => boolean): Array<any> {
    return this.dataService.filterServers(filter);
  }*/

  /*filterByDomain(domain:string): void {
    //let domain = this.selectedDomain
    this.displayServers = this.dataService.filterServers(s => {
      return s.Domain === domain;
    });
    this.numServersInSelectedDomain = this.displayServers.length;
    this.statsInDomain = this.getServerStatistics(domain);
  }*/

  getServerStatistics(domain: string): number[] {
    let UndeployedServers = this.dataService.filterServers(s => s.Domain == domain && !s.PMDeployed);
    let UnrebootedServers = this.dataService.filterServers(s => s.Domain == domain && s.PMDeployed && !s.RebootPerformed);
    let Finished = this.dataService.filterServers(s => s.Domain == domain && s.PMDeployed && s.RebootPerformed);
    this.numServersInSelectedDomain = UndeployedServers.length + UnrebootedServers.length + Finished.length
    return [UndeployedServers.length, UnrebootedServers.length, Finished.length]
  }

  getProgressBarStyle(num: number) {
    let colors: string[] = ["#2AB025", "#EC7423", "#EC2323"];
    return {
      'width': (this.statsInDomain[num] / this.numServersInSelectedDomain) * 100 + '%',
      'background-color': colors[num]
    }
  }

  private sortServers(): void {
    this.displayServers.sort((s1, s2) => s1.App.localeCompare(s2.App));
  }

 /*private serverClick(event):void{
    let serverData = this.getServerDataFromClickedCell(event);
   this.dataService.setServerClicked(serverData);
 }*/

 private getServerDataFromClickedCell(event):any{
  //console.log(event); 
  let tr = event.target.parentElement
   let tdList = tr.children
   let serverData = {}
  for(let i=0;i<this.keys.length;i++){
    serverData[this.keys[i]] = tdList[i].innerText
  }
  return serverData
 }

 public openModal(event):void {

  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

    dialogConfig.data = this.getServerDataFromClickedCell(event);

  this.dialog.open(ModalComponent, dialogConfig);
}


}
