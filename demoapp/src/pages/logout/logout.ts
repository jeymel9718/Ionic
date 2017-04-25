import { Component } from '@angular/core';
import {
  NavController,
  AlertController } from 'ionic-angular';


import { AuthProvider } from '../../providers/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})

export class LogoutPage {
	
	constructor(public navCtrl: NavController, public authProvider: AuthProvider,
		private alertCtrl: AlertController) {
	}

	logoutUser(): void {
  		let alert = this.alertCtrl.create({
    	title: 'Confirm purchase',
    	message: 'Do you want to buy this book?',
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
}