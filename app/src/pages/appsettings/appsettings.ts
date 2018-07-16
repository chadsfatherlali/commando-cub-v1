import { Component } from "@angular/core";

import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'page-appsettings',
    templateUrl: 'appsettings.html'
})
export class AppSettingsPage {
    constructor (
        private translate: TranslateService,
    ) {
        this.translate.setDefaultLang('es')
    }
}