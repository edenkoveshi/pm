import { Component, OnInit } from '@angular/core';
import { PmTableComponent } from '../pm-table/pm-table.component'
import { NavbarComponent } from '../navbar/navbar.component'
import { SelectComponent } from '../select/select.component'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit(): void {
    if(this.authService.getCurrentUser() == undefined){
      this.router.navigate(['']);
    }
  }

}
