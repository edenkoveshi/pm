import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private loading : boolean = false;
  private submitted : boolean = false;
  private invalidCredentials: boolean = false;
  private returnUrl: string;


  constructor(private router: Router,private formBuilder: FormBuilder,private authService:AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  onSubmit() : void{
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {  
      return;
    }

    this.invalidCredentials = !(this.authService.validateUser(this.creds.username.value,this.creds.password.value));

    if(this.invalidCredentials) return;

    this.loading = true;
    this.authService.setCurrentUser(this.creds.username.value);
    this.router.navigate(['pmtable']);
  }

  get creds() { return this.loginForm.controls; }

}
