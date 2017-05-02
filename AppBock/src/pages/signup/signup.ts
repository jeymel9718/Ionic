import { Component } from '@angular/core';
import {  
  NavController, 
  Loading,
  LoadingController,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth';
import { EmailValidator } from '../../validators/email';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  loading: Loading;
  constructor(public navCtrl: NavController, public authProvider: AuthProvider,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController) {

      this.signupForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        username: ['', Validators.compose([Validators.minLength(2),Validators.required])]
      });
  }

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authProvider.signupUser(this.signupForm.value.email, 
        this.signupForm.value.password)
      .then(() => {
        this.loading.dismiss().then( () => {
          this.authProvider.updateUserData({displayName: this.signupForm.value.username}).then(()=>{
            this.navCtrl.setRoot(TabsPage);
          },(error)=>{
            let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
            });
            alert.present();
          });
        });
   
        
      }, (error) => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

}