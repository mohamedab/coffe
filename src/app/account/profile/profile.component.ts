import { Component, OnInit } from '@angular/core';
import {FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public infoForm!:UntypedFormGroup;
  public passwordForm!:UntypedFormGroup;
  constructor(public formBuilder: UntypedFormBuilder,
              public authService: AuthService) { }

  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.required]
    });
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    },{validator: this.matchingPasswords('newPassword', 'confirmNewPassword')});
  }

  public onInfoFormSubmit(values:any):void {
    if (this.infoForm.valid) {
      this.authService.updateUserInfo(values);
    }
  }

  public onPasswordFormSubmit(values:any):void {
    if (this.passwordForm.valid) {
      this.authService.updateUserPassword(values);
    }
  }

  private matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let password = group.controls[passwordKey];
      let passwordConfirmation = group.controls[passwordConfirmationKey];
      if (password.value !== passwordConfirmation.value) {
        return passwordConfirmation.setErrors({mismatchedPasswords: true})
      }
    }
  }

}
