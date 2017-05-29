import { Component } from '@angular/core';
import {
  NavController,
  AlertController } from 'ionic-angular';


import { AuthProvider } from '../../providers/auth';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})

export class LogoutPage {
	user: any;
  public informationForm:FormGroup;

	constructor(public navCtrl: NavController, public authProvider: AuthProvider,
		private alertCtrl: AlertController,public formBuilder: FormBuilder) {
    this.user=this.authProvider.getUserData();
    this.informationForm=this.formBuilder.group({name:[this.user.name],username:[this.user.username]
      ,email:[this.user.email]});
    
    
	}

	logoutUser(): void {
  		let alert = this.alertCtrl.create({
    	title: 'Signout',
    	message: 'Do you want to signout?',
    	buttons: [
      	{
        	text: 'Cancel',
        	role: 'cancel',
        	handler: () => {
          		console.log('Cancel clicked');
        	}
      	},
      	{
        	text: 'Yes',
        	handler: () => {
          		this.authProvider.logoutUser();
          		console.log('logout correct');
          		this.navCtrl.setRoot(LoginPage);
        	}
      	}
    	]
  		});
  		alert.present();
  	}
  Updateuserinfo(){
    var updates={name:this.informationForm.value.name,username:this.informationForm.value.email};
    this.authProvider.updateUserData(updates);
  }
}