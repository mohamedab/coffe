import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserProfile} from "../../shared/models/userProfile";
import {AuthService} from "../../shared/services/auth.service";
import {Roles} from "../../shared/models/roles";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public registerForm!: FormGroup;
  public hide = true;
  errorMessage: any = null;
  showSpinner: boolean = false;
  public userTypes = [
    {id: 1, name: Roles.SUPERADMIN},
    {id: 2, name: Roles.SERVER},
    {id: 3, name: Roles.MANAGER}
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
      const user: UserProfile = {
        displayName: values.username,
        email: values.email,
        emailVerified: false,
        roles: [values.userType.name],
        userId: ''
      }
      this.showSpinner = true;
      this.authService.signUp(values.email, values.password, user)
        .then((result) => {
          /* Call the SendVerificaitonMail() function when new user sign up and returns promise */
          this.authService.sendVerificationMail(user);
          this.authService.addUserData(result.user, user);
          this.router.navigate(['login']);
          this.showSpinner = false;
        }).catch((error) => {
        this.errorMessage = 'Cannot create User';
        this.showSpinner = false;
      });
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
