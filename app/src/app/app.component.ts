import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SignUpPage } from '../pages/signup/signup';
import { AppSettingsPage } from '../pages/appsettings/appsettings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  private rootPage:any = SignUpPage
  private signUpPage:any
  private appSettingsPage:any

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.signUpPage = SignUpPage
    this.appSettingsPage = AppSettingsPage
  }

  menuNavigation (page) {
    this.rootPage = page
  }
}

