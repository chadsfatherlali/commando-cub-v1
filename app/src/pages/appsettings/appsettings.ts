import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'page-appsettings',
    templateUrl: 'appsettings.html'
})
export class AppSettingsPage {
    public language: string

    constructor (
        private translate: TranslateService,
        private storage: Storage
    ) {
        this.storage.get('userLang').then(value => {
            let lang = value || 'es'
    
            this.language = lang
        })
    }

    setLanguage (value: any) {
        this.translate.use(value)
        this.storage.set('userLang', value)
    }
}