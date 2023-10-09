import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public hide = true;
  constructor(public fb: FormBuilder,
              public router:Router,
              public authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: false
    });
  }

   // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  public onLoginFormSubmit(values:any):void {
    if (this.loginForm.valid) {
      console.log(values);
      this.authService.signIn(values.username, values.password);
    }
  }

}
