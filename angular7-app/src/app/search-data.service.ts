import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import db from '../assets/db.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  searchOption = [];
  db: any;
  displayServers: Array<any>; //List of servers that will be DISPLAYED
  chosenDomain: Observable<string>;
  private domain = new BehaviorSubject("");

  constructor() {
    this.db = db;
    this.displayServers = this.db.Servers;
    this.sortServers();
    this.chosenDomain = this.domain.asObservable();
  }

  getAllServers(): Array<any> {
    return this.db.Servers;
  }

  getDisplayServers(): Array<any> {
    return this.displayServers;
  }

  filterServers(filter: (s1) => boolean): Array<any> {
    return this.db.Servers.filter(filter);
  }

  setDisplayServers(servers: Array<any>) : void {
    this.displayServers = servers;
    this.sortServers();
  }

  sortServers(): void {
    this.displayServers.sort((s1, s2) => s1.App.localeCompare(s2.App));
  }

  getDomains(): string[] {
    return this.db.Domains;
  }

  setChosenDomain(domain: string): void {
    this.domain.next(domain);
  }

  getApps(): string[] {
    return this.db.Apps;
  }

  


}
