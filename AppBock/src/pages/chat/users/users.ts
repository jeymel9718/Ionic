import { Component } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';
import { MessageService } from '../../../providers/message-service';
import { ChatsPage } from '../chats';

@Component({
    templateUrl: 'users.html'
})

export class UsersPage{
	users:any;
	pusers:any;
	currentUser:any;
	constructor(public navCtrl: NavController
		,public messageService: MessageService, public navParams: NavParams) {
		this.currentUser=this.navParams.get('currentUser');	
	}

	ngOnInit() {
	    this.users=this.messageService.getAllUsers();
	    this.pusers=this.users;
    };

    openChat(user) {
    	let chatData = {
		  lastMessage: 'Hi..',
		  timestamp: Date.now(),
		  title: {from:this.currentUser.username ,to:user.username},
		  to: user.id,
		  from: this.currentUser.id
		}
		this.messageService.createChat(chatData);
		this.navCtrl.push(ChatsPage);
    }

    getItems(ev:any){
    	this.users=this.pusers;
    	// set val to the value of the searchbar
	    let val = ev.target.value;

	    // if the value is an empty string don't filter the items
	    if (val && val.trim() != '') {
	      this.users = this.users.filter((item) => {
	        return (item.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
	      })
	    }
    }
}


