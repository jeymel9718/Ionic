import { Component, ViewChild , NgZone} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { ListPage } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  zone:NgZone;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    //initialize zone
    this.zone = new NgZone({});

    //firebase initialize database
    firebase.initializeApp({
      apiKey: "AIzaSyBBfM9FeiJm3lHPZP8YBVtCBGg3VXXqtyo",
      authDomain: "ionic-app-49e4c.firebaseapp.com",
      databaseURL: "https://ionic-app-49e4c.firebaseio.com",
      projectId: "ionic-app-49e4c",
      storageBucket: "ionic-app-49e4c.appspot.com",
      messagingSenderId: "935877929764"
    });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: TabsPage },
      { title: 'List', component: ListPage },
      { title: 'Information', component: LogoutPage}
    ];

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run( () => {
      if (!user) {
        this.rootPage = LoginPage;
        unsubscribe();
      } else { 
        this.rootPage = TabsPage;
        unsubscribe();
      }
    });     
});

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
