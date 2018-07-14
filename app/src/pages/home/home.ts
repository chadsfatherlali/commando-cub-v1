import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';

import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items: Observable<any[]>;

  constructor(
  	public navCtrl: NavController,
    private translate: TranslateService,
    private db: AngularFirestore
  ) {
    this.translate.setDefaultLang('es')
    this.items = this.db.collection('people').valueChanges()
  }
}
