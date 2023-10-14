import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "../shared/services/auth.service";
import {onAuthStateChanged} from "@angular/fire/auth";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm!: FormGroup;
  public hide = true;
  errorMessage: any = null;
  succesMessage: any;
  showSpinner: boolean= false;

  constructor(public fb: FormBuilder,
              public router: Router,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      resetEmail: [null, Validators.compose([Validators.required, Validators.email])],
    });
  }

  get f() {
    return this.resetPasswordForm.controls;
  }

  forgotPassword(values: any) {
    if (this.resetPasswordForm.valid) {
      this.showSpinner = true;
      this.authService.forgotPassword(values.resetEmail)
        .then(() => {
          this.succesMessage = 'Password reset email sent, check your inbox.';
          this.showSpinner = false;
        })
        .catch((error) => {
          this.errorMessage = 'Cannot reset password';
          this.showSpinner = false;
        });
    }
  }

  goToResetLoginPage() {
    this.router.navigate(['login']);
  }
}
