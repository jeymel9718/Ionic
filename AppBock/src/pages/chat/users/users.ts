import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MessageService } from '../../../providers/message-service';
import { ChatsPage } from '../chats';

@Component({
    templateUrl: 'users.html'
})

export class UsersPage{
	users:any;
	constructor(public navCtrl: NavController
		,public messageService: MessageService) {
		
	}

	ngOnInit() {
	    this.users=this.messageService.getAllUsers();
    };

    openChat(user) {
    	let chatData = {
		  lastMessage: 'Hi..',
		  timestamp: Date.now(),
		  title: user.name
		}
		this.messageService.createChat(chatData);
		this.navCtrl.push(ChatsPage);
    }
}


