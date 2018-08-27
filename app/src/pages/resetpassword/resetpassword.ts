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
    private resetPasswordStatus: boolean = false

    public signIn_errors: any
    public resetPassword_form: FormGroup
    public segment: string = 'signin'
    public userCredentials: any = {
        email: null,
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
        this.toast.onDidDismiss(() => {
            if (this.resetPasswordStatus) this.navCtrl.pop()
        })
    }

    sendResetPasswordLink () {
        this.authFire.auth.sendPasswordResetEmail(this.userCredentials.email)
            .then(response => {
                console.log('OK', response)

                this.resetPasswordStatus = true
                this.translate.get('RESETPASSWORD.MESSAGE.OK').subscribe(value => {
                    this.toast.data.message = value
                    this.toast.present()
                })
            })
            .catch(err => {
                console.log('KO', err)

                this.resetPasswordStatus = false
                this.translate.get(`RESETPASSWORD.MESSAGE.KO.${err.code}`).subscribe(value => {
                    this.toast.data.message = value
                    this.toast.present()
                })
            })
    }
}