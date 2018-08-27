import { Component } from '@angular/core';

import { 
    AngularFirestore,
    AngularFirestoreDocument
} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { ImageLoaderConfig } from 'ionic-image-loader';

import { Observable } from 'rxjs';
import { Item } from 'ionic-angular/umd';
import { 
    NavController,
    NavParams
} from 'ionic-angular';

@Component({
    selector: 'page-createissue',
    templateUrl: 'createissue.html'
})
export class CreateIssuePage {
    private userDoc:AngularFirestoreDocument<Item>
    
    public userStatus:any
    public user: Observable<Item>

    constructor (
        public authFire: AngularFireAuth,
        private db: AngularFirestore,
        private navCtrl: NavController,
        private navParams: NavParams,
        private imageLoaderConfig: ImageLoaderConfig
    ) {}
}