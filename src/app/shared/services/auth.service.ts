import {Injectable, NgZone} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile
} from '@angular/fire/auth';
import {collection, doc, Firestore, getDoc, setDoc} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {UserProfile} from "../models/userProfile";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BehaviorSubject, Observable, of} from "rxjs";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  currentUser: any;
  usersRef: any;
  connectedUser: BehaviorSubject<UserProfile> = new BehaviorSubject<UserProfile>(new UserProfile());

  constructor(public afAuth: Auth,
              public firestore: Firestore,
              public router: Router,
              public snackBar: MatSnackBar,
  ) {
    this.usersRef = collection(this.firestore, 'Users');
    if (this.afAuth) {
      onAuthStateChanged(this.afAuth, (user) => {
        if (user) {
          this.userData = user;
          this.currentUser = this.afAuth.currentUser;
        } else {
          localStorage.setItem('user', 'null');
          this.currentUser = null;
          this.connectedUser.next(new UserProfile());
        }
      });
    }
  }

  getConnectedUserDoc(user: any) {
    const docRef = doc(this.firestore, "Users", user.uid);
    getDoc(docRef).then(docSnap => {
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const userProfile: UserProfile = docSnap.data() as UserProfile;
        this.connectedUser.next(userProfile);
        localStorage.setItem('user', JSON.stringify(docSnap.data()));
      } else {
        console.log("No such document!");
      }
    });
  }

  // Sign in with email/password
  signIn(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }

  // Sign up with email/password
  signUp(email: string, password: string, user: UserProfile): Promise<any> {
    return createUserWithEmailAndPassword(this.afAuth, email, password);
  }

  // Send email verfificaiton when new user sign up
  sendVerificationMail(user: UserProfile) {
    sendEmailVerification(this.currentUser)
      .then(() => {
        user.emailVerified = true;
        this.snackBar.open('Verification mail sent with succes!', '×', {
          panelClass: 'success',
          verticalPosition: 'top',
          duration: 3000
        });
      });
  }

  // Reset Forgot password
  forgotPassword(passwordResetEmail: string): Promise<any> {
   return sendPasswordResetEmail(this.afAuth, passwordResetEmail);
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false;
  }

  getConnectedUser(): Observable<UserProfile> {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user !== null) {
      return of(user);
    }
    return this.connectedUser as Observable<UserProfile>;
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: any): Promise<void> {
    const userRef = doc(this.usersRef, user.uid);
    return setDoc(userRef, {emailVerified: user.emailVerified}, {merge: true});
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
    });
  }

  updateUserInfo(values: any) {
    updateProfile(this.currentUser, {displayName: values.name})
      .then(() => {
      }).catch(err => console.log(err));
    updateEmail(this.currentUser, values.email).then(() => {
      this.updateUserInfoDos(values);
    }).catch(err => console.log(err));
  }

  private updateUserInfoDos(values: any) {
    const userRef = doc(this.usersRef, this.currentUser.uid);
    setDoc(userRef, {displayName: values.name, email: values.email, phone: values.phone}, {merge: true})
      .then(() => {
          this.snackBar.open('Your account information updated successfully!', '×', {
            panelClass: 'success',
            verticalPosition: 'top',
            duration: 3000
          });
        }
      ).catch(err => console.log(err));
  }

  updateUserPassword(values: any) {
    updatePassword(this.currentUser, values.newPassword).then(() => {
      this.snackBar.open('Your password changed successfully!', '×', {
        panelClass: 'success',
        verticalPosition: 'top',
        duration: 3000
      });
    }).catch((error) => console.log(error));
  }
}
