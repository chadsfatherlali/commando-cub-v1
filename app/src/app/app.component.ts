import { Component } from '@angular/core';
import { 
  Platform,
  LoadingController
} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { AngularFireAuth } from 'angularfire2/auth';

import { SignInPage } from '../pages/signin/signin';
import { SignUpPage } from '../pages/signup/signup';
import { SignInOrSignUpPage } from '../pages/signinorsignup/signinorsignup';
import { AppSettingsPage } from '../pages/appsettings/appsettings';

import { App } from 'ionic-angular';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  private rootPage:any = null
  private signInPage:any
  private signUpPage:any
  private signInOrSignUpPage:any
  private appSettingsPage:any
  private loader:any
  
  public userStatus:any

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,

    private translate: TranslateService,
    private storage: Storage,
    
    public authFire: AngularFireAuth,
    public app: App,
    public loadingCtrl: LoadingController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.storage.get('userLang').then(value => {
      let lang = value || 'es'

      this.translate.setDefaultLang(lang)
      this.translate.get('LOADER').subscribe(value => {
        this.loader = this.loadingCtrl.create({
          content: value
        })

        this.loader.present();
      })
    })

    this.authFire.authState.subscribe(user => {
      this.userStatus = user
      
      if (user) {
        this.app.getRootNav().setRoot(HomePage)
      }

      else {
        this.app.getRootNav().setRoot(SignInOrSignUpPage)
      }

      this.loader.dismiss();
    })

    this.signInPage = SignInPage
    this.signUpPage = SignUpPage
    this.signInOrSignUpPage = SignInOrSignUpPage
    this.appSettingsPage = AppSettingsPage
  }

  menuNavigation (page) {
    this.rootPage = page
  }

  logout () {
    this.authFire.auth.signOut()
      .then(res => {
        console.log('OK', res)

        this.app.getRootNav().setRoot(SignInOrSignUpPage)
      })
      .catch(err => {
        console.log('KO', err)
      })
  }
}

