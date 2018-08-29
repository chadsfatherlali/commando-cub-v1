import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { IonicImageLoader } from 'ionic-image-loader'; 
import { Geolocation } from '@ionic-native/geolocation';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { SanitizerPipe } from '../pipes/sanitizer/sanitizer';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserProfilePage } from '../pages/userprofile/userprofile';
import { SignInPage } from '../pages/signin/signin';
import { SignUpPage } from '../pages/signup/signup';
import { SignInOrSignUpPage } from '../pages/signinorsignup/signinorsignup';
import { AppSettingsPage } from '../pages/appsettings/appsettings';
import { ResetPasswordPage } from '../pages/resetpassword/resetpassword';
import { CreateIssuePage } from '../pages/createissue/createissue';
import { UploadImagePage } from '../pages/uploadimage/uploadimage';

export const environment = {
  production: false,
  firebase: {
    projectId: 'commando-cub-test',
    apiKey: 'AIzaSyDG5bmQLBp27v60VLv1YWk5Y9pkChc2VeI',
    authDomain: 'commando-cub-test.firebaseapp.com',
    databaseURL: 'https://commando-cub-test.firebaseio.com',
    storageBucket: 'commando-cub-test.appspot.com',
    messagingSenderId: '306564613918'
  }
};

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    SanitizerPipe,
    MyApp,
    HomePage,
    UserProfilePage,
    SignInPage,
    SignUpPage,
    SignInOrSignUpPage,
    AppSettingsPage,
    ResetPasswordPage,
    CreateIssuePage,
    UploadImagePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicImageLoader.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserProfilePage,
    SignInPage,
    SignUpPage,
    SignInOrSignUpPage,
    AppSettingsPage,
    ResetPasswordPage,
    CreateIssuePage,
    UploadImagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AngularFirestore,
    Facebook,
    GooglePlus,
    PhotoLibrary,
    Geolocation,
    Storage,
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}