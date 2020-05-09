import { Injectable } from '@angular/core';
import { DataService } from './data.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users:User[] = new Array<User>();
  private currentUser:string;

  constructor(private dataService: DataService) { 
    this.dataService.users.subscribe(users => {
      users.forEach(u => {
        let perms : Permission[] = new Array<Permission>();
        u.permissions.forEach(p => {
          perms.push(new Permission(p.permissionName,p.permissionScope));
        })
        this.users.push(new User(u.username,u.password,perms));
      })
    });
  }

  public validateUser(username : string,password: string): boolean{
    //console.log(this.users.filter(u => u.username == username && u.password == password).length != 0)
    return (this.users.filter(u => u.username == username && u.password == password).length != 0)
  }

  public setCurrentUser(username:string):void{
    this.currentUser = username;
  }

  public getCurrentUser():string{
    return this.currentUser;
  }

  public getUserPermittedApplications(username:string):(string | string[]){
    let user:User[] = this.users.filter(u => u.username == username)
    if(user.length == 0) return [];
    let permissions:Permission[] = user[0].permissions;
    let appsPermission:Permission[] = permissions.filter(p => p.name == "ViewApplications")
    if(appsPermission.length == 0) return [];
    let perm:Permission = appsPermission[0];
    if(perm.scope === "*"){
      return "*";
    }
    else if(perm.scope instanceof Array){ 
      return perm.scope;
    }
    return [];
  }
}

class Permission{
  name: string;
  scope: string | string[];

  constructor(name:string,scope? :(string | string[])){
    this.name = name;
    if(scope != undefined){this.scope = scope;}
  }
}

class User{
  username: string;
  password: string;
  permissions: Permission[];

  constructor(username:string,password:string,permissions:Permission[]){
    this.username = username;
    this.password = password;
    this.permissions = permissions;
  }
}

