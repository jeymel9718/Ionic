import {Injectable} from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {
  constructor() {}

  loginUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  facebooklogin(): firebase.Promise<any>{
    var provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }

  signupUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( newUser => {
        firebase.database().ref('/userProfile').child(newUser.uid)
        .set({ email: email });
  	});
  }

  resetPassword(email: string): firebase.Promise<void> {
  	return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<void> {
  	return firebase.auth().signOut();
  }

  getUserData(): firebase.User{
    return firebase.auth().currentUser;
  }
}