import { Component } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';
import { MessageService } from '../../../providers/message-service';
import { ChatsPage } from '../chats';

@Component({
    templateUrl: 'users.html'
})

export class UsersPage{
	users:any;
	currentUser:any;
	constructor(public navCtrl: NavController
		,public messageService: MessageService, public navParams: NavParams) {
		this.currentUser=this.navParams.get('currentUser');	
	}

	ngOnInit() {
	    this.users=this.messageService.getAllUsers();
    };

    openChat(user) {
    	let chatData = {
		  lastMessage: 'Hi..',
		  timestamp: Date.now(),
		  title: {from:this.currentUser.displayName ,to:user.name},
		  to: user.id,
		  from: this.currentUser.uid
		}
		this.messageService.createChat(chatData);
		this.navCtrl.push(ChatsPage);
    }
}


