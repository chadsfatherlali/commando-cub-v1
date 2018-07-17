import { Component } from '@angular/core';
import { 
    Validators,
    FormBuilder,
    FormGroup
} from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

import { HomePage } from '../home/home';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html'
})
export class SignInPage {
    public signInWithEmailAndPassword_form: FormGroup
    public userCredentials: any = {
        email: null,
        password: null
    }

    constructor (
        private navCtrl: NavController,
        private formBuilder: FormBuilder,
        public authFire: AngularFireAuth
    ) {
        this.signInWithEmailAndPassword_form = this.formBuilder.group({
            email: [
                '', 
                [
                    Validators.required, 
                    Validators.email
                ]
            ],
            password: [
                '', 
                [
                    Validators.required, 
                    Validators.minLength(6)
                ]
            ]
        })
    }

    signInWithFacebook () {
        this.authFire.auth.signInWithPopup(new auth.FacebookAuthProvider())
            .then(res => {
                console.log('OK', res)
                this.navCtrl.setRoot(HomePage)
            })
            .catch(err => {
                console.log('KO', err)
            })
    }

    signInWithGoogle () {
        this.authFire.auth.signInWithPopup(new auth.GoogleAuthProvider())
            .then(res => {
                console.log('OK', res)
                this.navCtrl.setRoot(HomePage)
            })
            .catch(err => {
                console.log('KO', err)
            })
    }

    signInWithEmailAndPassword () {
        this.authFire.auth.signInWithEmailAndPassword(
            this.userCredentials.email,
            this.userCredentials.password
        )
            .then(res => {
                console.log('OK', res)

                this.userCredentials.email = null
                this.userCredentials.password = null
                this.navCtrl.setRoot(HomePage)
            })
            .catch(err => {
                console.log('KO', err)
            })

    }
}