import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private db: any;
  private _displayServers: BehaviorSubject<Array<any>>; //List of servers that will be DISPLAYED
  public displayServers: Observable<Array<any>>;
  public chosenDomain: Observable<string>;
  private domain: BehaviorSubject<string>;
  private _users:BehaviorSubject<Array<any>>;
  public users:Observable<Array<any>>;
  /*private _serverClicked: BehaviorSubject<any>;
  public serverClicked: Observable<any>;*/


  constructor(private http: HttpClient) {
    this.db = {Servers:[],Apps:[],Domains:[],Users:[]};
    let dbUrl = "https://raw.githubusercontent.com/edenkoveshi/pm/master/angular7-app/src/assets/db.json"
    this.http.get(dbUrl, { responseType: 'json' }).subscribe(db => {
      this.db = db
      this._users.next(db.Users);
    });
    this._displayServers = new BehaviorSubject(this.db.Servers);
    this.displayServers = this._displayServers.asObservable();
    /*this._serverClicked = new BehaviorSubject({});
    this.serverClicked = this._serverClicked.asObservable();*/
    this.sortServers();
    this.domain = new BehaviorSubject("")
    this.chosenDomain = this.domain.asObservable();
    this._users = new BehaviorSubject(this.db.Users);
    this.users = this._users.asObservable();
    
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
}