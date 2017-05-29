import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook'
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



//pages imports
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AboutPage } from '../pages/about/about';
import { ChatsPage } from '../pages/chat/chats';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { LogoutPage } from '../pages/logout/logout';
import { ImageHolder } from '../pages/img-custom';
import { MomentPipe } from '../pipes/moment/moment.pipe';
import { MessagesPage } from '../pages/chat/messages/messages';
import { UsersPage } from '../pages/chat/users/users';


// Providers
import { AuthProvider } from '../providers/auth';
import { MessageService } from '../providers/message-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LogoutPage,
    AboutPage,
    ChatsPage,
    TabsPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    ImageHolder,
    MomentPipe,
    MessagesPage,
    UsersPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LogoutPage,
    AboutPage,
    ChatsPage,
    TabsPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    MessagesPage,
    UsersPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    MessageService,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export class AppModule {}
