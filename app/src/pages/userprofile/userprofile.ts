import { Component } from '@angular/core';

import { 
    AngularFirestore,
    AngularFirestoreDocument
} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { ImageLoaderConfig } from 'ionic-image-loader';

import { Observable } from 'rxjs';
import { Item } from 'ionic-angular/umd';
import { 
    NavController,
    NavParams
} from 'ionic-angular';

import { SignInOrSignUpPage } from '../signinorsignup/signinorsignup';

@Component({
    selector: 'page-userprofile',
    templateUrl: 'userprofile.html'
})
export class UserProfilePage {
    private userDoc:AngularFirestoreDocument<Item>
    
    public userStatus:any
    public user: Observable<Item>

    constructor (
        public authFire: AngularFireAuth,
        private db: AngularFirestore,
        private navCtrl: NavController,
        private navParams: NavParams,
        private imageLoaderConfig: ImageLoaderConfig
    ) {
        this.imageLoaderConfig.useImageTag(true)
        this.imageLoaderConfig.setMaximumCacheAge(24 * 60 * 60 * 1000)

        const userEmail = this.navParams.get('email')
        
        if (userEmail) {
            this.setUserInfo(userEmail)
        }

        else {
            this.authFire.authState.subscribe(user => {
                this.userStatus = user

                user
                    ? this.setUserInfo(user.email)
                    : this.navCtrl.setRoot(SignInOrSignUpPage)
            })
        }
    }

    private setUserInfo (userEmail:string) {
        this.userDoc = this.db.doc<Item>(`users/${userEmail}`)
        this.user = this.userDoc.valueChanges()
    }
}