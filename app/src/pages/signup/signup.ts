import { Component } from "@angular/core";

import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignUpPage {
    constructor (
        private translate: TranslateService,
    ) {
        this.translate.setDefaultLang('es')
    }
}