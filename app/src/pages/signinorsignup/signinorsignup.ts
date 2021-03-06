import { Component } from '@angular/core';
import { 
    Validators,
    FormBuilder,
    FormGroup
} from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { TranslateService } from '@ngx-translate/core'
import { Facebook } from '@ionic-native/facebook';

import { HomePage } from '../home/home';
import { 
    NavController,
    ToastController,
    Platform
} from 'ionic-angular';

@Component({
    selector: 'page-signinorsignup',
    templateUrl: 'signinorsignup.html'
})
export class SignInOrSignUpPage {
    private toast: any
    public signUp_errors: any
    public signIn_errors: any
    public signUpWithEmailAndPassword_form: FormGroup
    public signInWithEmailAndPassword_form: FormGroup
    public segment: string = 'signin'
    public userCredentials: any = {
        email: null,
        password: null
    }

    constructor (
        private navCtrl: NavController,
        private formBuilder: FormBuilder,
        private toastCtrl: ToastController,
        private translate: TranslateService,

        public platform: Platform,
        public facebook: Facebook,
        public authFire: AngularFireAuth
    ) {
        const validators = {
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
        }

        this.signUpWithEmailAndPassword_form = this.formBuilder.group(validators)
        this.signInWithEmailAndPassword_form = this.formBuilder.group(validators)
        this.toast = this.toastCtrl.create({
            showCloseButton: true,
            position: 'bottom',
            closeButtonText: 'Ok',
            duration: 10000
        })
    }

    signInWithFacebook () {
        if (this.platform.is('cordova')) {
            this.facebook.login(['email', 'public_profile'])
                .then(res => {
                    const facebookCredentials = auth.FacebookAuthProvider.credential(res.authResponse.accessToken)

                    this.authFire.auth.signInWithCredential(facebookCredentials)
                        .then(res => {
                            console.log('Ok', res)
                            this.navCtrl.setRoot(HomePage)
                        })
                        .catch(err => {
                            console.log('Ko', err)
                        })
                })
        }

        else {
            this.authFire.auth.signInWithPopup(new auth.FacebookAuthProvider())
                .then(res => {
                    console.log('OK', res)
                    this.navCtrl.setRoot(HomePage)
                })
                .catch(err => {
                    console.log('KO', err)
                })
        }
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
                
                this.translate.get(`SIGNIN.ERRORS.${err.code}`).subscribe(value => {
                    this.toast.data.message = value
                    this.toast.present()
                })
            })

    }

    signUpWithEmailAndPassword () {
        this.authFire.auth.createUserWithEmailAndPassword(
            this.userCredentials.email,
            this.userCredentials.password
        )
            .then(res => {
                console.log('OK', res)

                this.userCredentials.email = null
                this.userCredentials.password = null
                this.segment = 'signin'
            })
            .catch(err => {
                console.log('KO', err)
            })

    }
}