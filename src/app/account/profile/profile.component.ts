import {Component, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public infoForm!: UntypedFormGroup;
  public passwordForm!: UntypedFormGroup;
  profileErrorMessage: any = null;
  passwordErrorMessage: any = null;

  constructor(public formBuilder: UntypedFormBuilder,
              public authService: AuthService,
              public snackBar: MatSnackBar) {
  }

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
    }, {validator: this.matchingPasswords('newPassword', 'confirmNewPassword')});
  }

  public onInfoFormSubmit(values: any): void {
    if (this.infoForm.valid) {
      this.authService.updateUserInfo(values).subscribe(result => {
        this.authService.updateUserInfoDos(values).then(() => {
            this.authService.getConnectedUserDoc(this.authService.userData);
            this.snackBar.open('Your account information updated successfully!', '×', {
              panelClass: 'success',
              verticalPosition: 'top',
              duration: 3000
            });
            this.profileErrorMessage = null;
          }
        ).catch(err => {
          console.log(err);
          this.profileErrorMessage = this.extractErrorMessage(err.message);
        });
      }, err => {
        console.log(err);
        this.profileErrorMessage = this.extractErrorMessage(err.message);
      });
    }
  }

  public onPasswordFormSubmit(values: any): void {
    if (this.passwordForm.valid) {
      this.authService.updateUserPassword(values)
        .then(() => {
          this.snackBar.open('Your password changed successfully!', '×', {
            panelClass: 'success',
            verticalPosition: 'top',
            duration: 3000
          });
          this.passwordErrorMessage = null;
        }).catch((err) => {
        console.log(err);
        this.passwordErrorMessage = 'Current password incorrect';
      });
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

  private extractErrorMessage(text: string): any {
    const match = text.match(/Firebase:\s(.*?)\s\(/);
    if (match) {
      const extractedText = match[1];
      return extractedText;
    } else {
      return text;
    }
  }

}
