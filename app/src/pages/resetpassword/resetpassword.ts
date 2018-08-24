import { Component } from '@angular/core';
import { 
    Validators,
    FormBuilder,
    FormGroup
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core'
import { 
    NavController,
    ToastController,
    Platform
} from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
    selector: 'page-resetpassword',
    templateUrl: 'resetpassword.html'
})
export class ResetPasswordPage {
    private toast: any

    public signIn_errors: any
    public resetPassword_form: FormGroup
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
        public authFire: AngularFireAuth
    ) {
        const validators = {
            email: [
                '', 
                [
                    Validators.required, 
                    Validators.email
                ]
            ]
        }

        this.resetPassword_form = this.formBuilder.group(validators)
        this.toast = this.toastCtrl.create({
            showCloseButton: true,
            position: 'bottom',
            closeButtonText: 'Ok',
            duration: 10000
        })
    }

    sendResetPasswordLink () {

    }
}