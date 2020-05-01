import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import db from '../assets/db.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  db: any;
  private _displayServers: BehaviorSubject<Array<any>>; //List of servers that will be DISPLAYED
  public displayServers: Observable<Array<any>>;
  public chosenDomain: Observable<string>;
  private domain: BehaviorSubject<string>;
  /*_searchResult: Observable<string>;
  private searchOption: BehaviorSubject<string>;*/
  //private searchResult: string;


  constructor() {
    this.db = db;
    this._displayServers = new BehaviorSubject(this.db.Servers);
    this.displayServers = this._displayServers.asObservable();
    this.sortServers();
    this.domain = new BehaviorSubject("")
    this.chosenDomain = this.domain.asObservable();
    /*this.searchOption = new BehaviorSubject("");
    this._searchResult = this.searchOption.asObservable();*/
    //this.searchResult = "";
  }

  public getAllServers(): Array<any> {
    return this.db.Servers;
  }

  public getDisplayServers(): Array<any> {
    console.log(this._displayServers.value)
    return this._displayServers.value;
  }

  public filterServers(filter: (s1) => boolean): Array<any> {
    return this.db.Servers.filter(filter);
  }

  public filterAndSetDisplayServers(filter: (s1) => boolean) : void {
    this.setDisplayServers(this.filterServers(filter))
  }

  public setDisplayServers(servers: Array<any>) : void {
    this._displayServers.next(servers);
    this.sortServers();
  }

  private sortServers(): void {
    this._displayServers.next(this._displayServers.value.sort((s1, s2) => s1.App.localeCompare(s2.App)));
  }

  public getDomains(): string[] {
    return this.db.Domains;
  }

  public getChosenDomain(): string {
    return this.domain.value;
  }

  public setChosenDomain(domain: string): void {
    this.domain.next(domain);
    this._displayServers.next(this.filterServers(s => {
      return s.Domain === domain;
    }));
  }

  public getApps(): string[] {
    return this.db.Apps;
  }

  /*public setSearchResult(result: string) : void {
    this.searchResult = result;
  }*/

  


}
