import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserProfile} from "../shared/models/userProfile";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public hide = true;
  public userTypes = [
    {id: 1, name: 'SuperAdmin'},
    {id: 2, name: 'Server'},
    {id: 3, name: 'Manager'}
  ];

  constructor(public fb: FormBuilder, public router: Router, public authService: AuthService) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      userType: ['', Validators.required],
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      receiveNewsletter: false
    }, {validator: this.matchingPasswords('password', 'confirmPassword')});
  }

  public onRegisterFormSubmit(values: any): void {
    if (this.registerForm.valid) {
      console.log(values);
      const user: UserProfile = {
        displayName: values.username,
        email: values.email,
        emailVerified: false,
        roles: [values.userType.name],
        userId: ''
      }
      this.authService.signUp(values.email, values.password, user);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
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
