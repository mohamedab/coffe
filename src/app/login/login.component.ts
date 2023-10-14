import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "../shared/services/auth.service";
import {onAuthStateChanged} from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public hide = true;
  errorMessage: any = null;
  showSpinner: boolean= false;

  constructor(public fb: FormBuilder,
              public router: Router,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: false
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  public onLoginFormSubmit(values: any): void {
    if (this.loginForm.valid) {
      this.showSpinner = true;
      this.authService.signIn(values.email, values.password)
        .then((result) => {
          onAuthStateChanged(this.authService.afAuth, (user) => {
            if (user) {
              this.authService.setUserData(user).then((result) => {
                this.errorMessage = null;
                this.authService.getConnectedUserDoc(user);
                this.router.navigate(['account']);
                this.showSpinner = false;
              }).catch((error) => {
                this.errorMessage = 'Username or Password invalid';
                this.showSpinner = false;
              });
            }
          });
        }).catch((error) => {
        this.errorMessage = 'Username or Password invalid';
        this.showSpinner = false;
      });
    }
  }

  forgotPassword(values: any) {
    this.authService.forgotPassword(values.resetEmail);
  }

  goToResetPasswordPage() {
    this.router.navigate(['reset'])
  }
}
