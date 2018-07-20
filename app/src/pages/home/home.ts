import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public users: Observable<any[]>;

  constructor(
  	public navCtrl: NavController,
    private db: AngularFirestore
  ) {
    this.users = this.db.collection('users').valueChanges()
  }
}
