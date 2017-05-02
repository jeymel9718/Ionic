import { MessageService } from '../../providers/message-service';
import { MessagesPage } from './messages/messages';
import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { UsersPage } from './users/users';

@Component({
  templateUrl: 'chats.html',
})

export class ChatsPage {
  userProfile: any = null;
  chats = [];

  constructor(public navCtrl: NavController, public app: App,
    public messageService: MessageService, public navParams: NavParams) {
    this.userProfile = navParams.get('user');
  }


  ngOnInit() {
    this.messageService.retrieveChats()
      .subscribe((data: Array<any>) => {
        console.log(data);
        this.chats = data;
      }, (err) => {
        alert('there was an error: ' + err);
      });
  }

  viewMessages(chat) {
    this.navCtrl.push(MessagesPage, { chatId: chat.id });
  }

  newChat() {

    /*let chatData = {
      lastMessage: 'Hi..',
      timestamp: Date.now(),
      title: 'New Chat'
    }

    this.messageService.createChat(chatData);*/
    this.navCtrl.push(UsersPage);
  }

}
