import { Component } from '@angular/core';
import { 
    Validators,
    FormBuilder,
    FormGroup
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core'
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { 
    NavController,
    ToastController,
    Platform
} from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';

import { HomePage } from '../home/home';

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
        private angularFireStore: AngularFirestore,

        public platform: Platform,
        public facebook: Facebook,
        public googlePlus: GooglePlus,
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

    private createDocOrNot (doc: string, data: any, action: any) {
        const docRef = this.angularFireStore.doc(doc);

        docRef.ref.get().
            then(doc => {
                if (!doc.exists) {
                    docRef.set(data)
                    .then(res => {
                        console.log('OK', res)
                        
                        action()
                    })
                    .catch(err => {
                        console.log('KO', err)
                    })
                }

                else {
                    action()
                }
            })
            .catch(err => {
                console.log('KO', err)
            })
    }

    signInWithFacebook () {
        if (this.platform.is('cordova')) {
            this.facebook.login(['email', 'public_profile'])
                .then(res => {
                    const facebookCredentials = auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
                    
                    this.authFire.auth.signInWithCredential(facebookCredentials)
                        .then(res => {
                            this.createDocOrNot(
                                `users/${res.email}`,
                                {
                                    displayName: res.displayName,
                                    photoURL: res.photoURL   
                                },
                                this.navCtrl.setRoot(HomePage)
                            )
                        })
                        .catch(err => {
                            console.log('KO', err)
                        })
                })
        }

        else {
            this.authFire.auth.signInWithPopup(new auth.FacebookAuthProvider())
                .then(res => {
                    this.createDocOrNot(
                        `users/${res.user.email}`,
                        {
                            displayName: res.user.displayName,
                            photoURL: res.user.photoURL
                        },
                        this.navCtrl.setRoot(HomePage)
                    )
                })
                .catch(err => {
                    console.log('KO', err)
                })
        }
    }

    signInWithGoogle () {
        if (this.platform.is('cordova')) {
            this.googlePlus.login({
                'webClientId': '306564613918-v50mip03ntgv4kbm4hse6pm6p02nojln.apps.googleusercontent.com',
                'offline': true,
                'scopes': 'profile email'
            })
                .then(res => {
                    const googlePlusCredentials = auth.GoogleAuthProvider.credential(res.idToken)

                    this.authFire.auth.signInWithCredential(googlePlusCredentials)
                        .then(res => {
                            this.createDocOrNot(
                                `users/${res.email}`,
                                {
                                    displayName: res.displayName,
                                    photoURL: res.photoURL   
                                },
                                this.navCtrl.setRoot(HomePage)
                            )
                        })
                        .catch(err => {
                            console.log('KO', err)
                        })
                })
                .catch(err => {
                    console.log('KO', err)
                })
        }

        else {
            this.authFire.auth.signInWithPopup(new auth.GoogleAuthProvider())
                .then(res => {
                    this.createDocOrNot(
                        `users/${res.user.email}`,
                        {
                            displayName: res.user.displayName,
                            photoURL: res.user.photoURL   
                        },
                        this.navCtrl.setRoot(HomePage)
                    )
                })
                .catch(err => {
                    console.log('KO', err)
                })
        }
    }

    signInWithEmailAndPassword () {
        this.authFire.auth.signInWithEmailAndPassword(
            this.userCredentials.email,
            this.userCredentials.password
        )
            .then(res => {
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
                this.userCredentials.email = null
                this.userCredentials.password = null
                this.segment = 'signin'
            })
            .catch(err => {
                console.log('KO', err)
            })

    }
}