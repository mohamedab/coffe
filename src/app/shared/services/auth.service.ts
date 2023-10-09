import {Injectable, NgZone} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import {addDoc, collection, doc, Firestore, setDoc} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {UserProfile} from "../models/userProfile";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  currentUser: any;
  usersRef: any;

  constructor(private afAuth: Auth,
              public firestore: Firestore,
              public router: Router,
              public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.usersRef = collection(this.firestore, 'Users');
    if (this.afAuth) {
      onAuthStateChanged(this.afAuth, (user) => {
        if (user) {
          this.userData = user;
          this.currentUser = this.afAuth.currentUser;
          localStorage.setItem('user', JSON.stringify(this.userData));
        } else {
          localStorage.setItem('user', 'null');
          this.currentUser = null;
        }
      });
    }
  }

  // Sign in with email/password
  signIn(email: string, password: string): void {
    signInWithEmailAndPassword(this.afAuth, email, password)
      .then((result) => {
        onAuthStateChanged(this.afAuth, (user) => {
          if (user) {
            this.setUserData(user);
            this.router.navigate(['menu']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  signUp(email: string, password: string, user: UserProfile) {
    createUserWithEmailAndPassword(this.afAuth, email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign up and returns promise */
        this.sendVerificationMail(user);
        this.addUserData(result.user, user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  sendVerificationMail(user: UserProfile) {
    sendEmailVerification(this.currentUser)
      .then(() => {
        user.emailVerified = true;
        console.log('verfication mail sent with succes');
        // this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forggot password
  forgotPassword(passwordResetEmail: string) {
    sendPasswordResetEmail(this.afAuth, passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false;
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: any) {
    const userRef = doc(this.usersRef, user.uid);
    setDoc(userRef, {displayName: user.emailVerified}, { merge: true })
      .then(() => {
        console.log('User Successfully updated');
      }
    ).catch(err => console.log(err));
  }

  addUserData(user: any, userProfile: UserProfile) {
    const userData: UserProfile = {
      userId: user.uid,
      email: user.email,
      displayName: userProfile.displayName,
      emailVerified: user.emailVerified,
      roles: userProfile.roles
    };
    const userRef = doc(this.usersRef, user.uid);
    setDoc(userRef, userData).then(
      () => {
        console.log('User Successfully added');
      }
    ).catch(err => console.log(err));
  }

  // Sign out
  signOut() {
    signOut(this.afAuth).then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
