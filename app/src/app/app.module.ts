import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth'; 

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignInPage } from '../pages/signin/signin';
import { SignUpPage } from '../pages/signup/signup';
import { AppSettingsPage } from '../pages/appsettings/appsettings';

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
    MyApp,
    HomePage,
    SignInPage,
    SignUpPage,
    AppSettingsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
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
    SignInPage,
    SignUpPage,
    AppSettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AngularFirestore,
    Storage,
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}
