import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { AngularFireAuth } from 'angularfire2/auth';

import { SignInPage } from '../pages/signin/signin';
import { SignUpPage } from '../pages/signup/signup';
import { AppSettingsPage } from '../pages/appsettings/appsettings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  private rootPage:any = SignUpPage
  private signInPage:any
  private signUpPage:any
  private appSettingsPage:any
  
  public userStatus:any

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private translate: TranslateService,
    private storage: Storage,
    public authFire: AngularFireAuth
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.authFire.authState.subscribe(user => {
      this.userStatus = user
    })

    this.storage.get('userLang').then(value => {
      let lang = value || 'es'

      this.translate.setDefaultLang(lang)
    })

    this.signInPage = SignInPage
    this.signUpPage = SignUpPage
    this.appSettingsPage = AppSettingsPage
  }

  menuNavigation (page) {
    this.rootPage = page
  }

  logout () {
    this.authFire.auth.signOut()
    this.rootPage = this.signInPage
  }
}

