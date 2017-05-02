import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ChatsPage } from '../chat/chats';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ChatsPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
