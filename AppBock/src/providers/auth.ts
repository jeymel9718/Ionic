import {Injectable} from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {
  provider = new firebase.auth.FacebookAuthProvider();
  
  constructor() {}

  loginUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  facebooklogin(): firebase.Promise<any>{
    
    return firebase.auth().signInWithPopup(this.provider)
    .then(result =>{
      firebase.database().ref('/users').child(result.user.uid)
      .set({email: result.user.email,
        name:result.user.displayName
      });
    });

    
  }

  signupUser(email: string, password: string, name: string): firebase.Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( newUser => {
        firebase.database().ref('/users').child(newUser.uid)
        .set({ email: email,
          name: name
         });
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
  updateUserData(data:any): firebase.Promise<void>{
    var user=firebase.auth().currentUser;
    return user.updateProfile(data)
  }

  getallUsers(){
    return firebase.database().ref('users');
  }
}