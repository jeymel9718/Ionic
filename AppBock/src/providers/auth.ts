import {Injectable} from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {
  user:any;
  
  constructor(private facebook:Facebook) {}

  loginUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  facebooklogin():any{
    return this.facebook.login(['email','public_profile']).then( (response) => {
      var facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential).then((newUser)=>{
        firebase.database().ref('/users').child(newUser.uid)
        .set({email:newUser.email,name:newUser.displayName,username:'name'})

      }).catch(error=>{
        console.log("Firebase failure: " + JSON.stringify(error));
      });
    })
  }

  putuser(){
    var id=firebase.auth().currentUser.uid;
    let userref=firebase.database().ref('/users/'+id);
    userref.on('value',(snapshot)=>{
        var arr=snapshot.val();
        arr['id']=id;
        this.user=arr;
      });
  }

  signupUser(email: string, password: string, name: string,username:string): firebase.Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( newUser => {
        firebase.database().ref('/users').child(newUser.uid)
        .set({ email: email,
          name: name,
          username: username
         });
  	});
  }

  resetPassword(email: string): firebase.Promise<void> {
  	return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<void> {
  	return firebase.auth().signOut();
  }

  getUserData():any{
    return this.user;
  }
  updateUserData(data:any):firebase.Promise<void>{
    var puser=firebase.auth().currentUser;
    if(this.user!=null){
      firebase.database().ref('/users/'+puser.uid).update(data);
      console.log(data);
    }
    var puser=firebase.auth().currentUser;
    let name:string=data.name;
    return puser.updateProfile({displayName:name, photoURL:''});
  }

}