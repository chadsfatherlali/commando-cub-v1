import { Component } from '@angular/core';

import { 
    AngularFirestore,
    AngularFirestoreDocument
} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs';
import { Item } from 'ionic-angular/umd';
import { NavController } from 'ionic-angular';

import { SignInOrSignUpPage } from '../signinorsignup/signinorsignup';

@Component({
    selector: 'page-userprofile',
    templateUrl: 'userprofile.html'
})
export class UserProfilePage {
    private userDoc:AngularFirestoreDocument<Item>
    public user: Observable<Item>

    constructor (
        public authFire: AngularFireAuth,
        private db: AngularFirestore,
        private navCtrl: NavController
    ) {        
        this.authFire.authState.subscribe(user => {
            if (user) {
                this.userDoc = this.db.doc<Item>(`users/${user.email}`)
                this.user = this.userDoc.valueChanges()
            }

            else {
                this.navCtrl.setRoot(SignInOrSignUpPage)
            }
        })
    }
}