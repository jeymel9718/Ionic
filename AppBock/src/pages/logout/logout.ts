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
	user: any;
  //Array with user information
  items: Array<string>;

	constructor(public navCtrl: NavController, public authProvider: AuthProvider,
		private alertCtrl: AlertController) {
    this.user=this.authProvider.getUserData();
    this.items=[];
    if(this.user!=null){
      this.items.push('Name: '+this.user.displayName);
      this.items.push('Email: '+this.user.email);
    }
    console.log(authProvider.getallUsers());
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
}