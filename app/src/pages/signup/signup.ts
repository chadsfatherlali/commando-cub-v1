import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignUpPage {
    constructor (
        public authFire: AngularFireAuth
    ) {}

    private signUpWithFacebook () {
        this.authFire.auth.signInWithPopup(new auth.FacebookAuthProvider())
            .then(res => {
                console.log('OK', res)
            })
            .catch(err => {
                console.log('KO', err)
            })
    }
}