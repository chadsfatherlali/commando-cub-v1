import { Component } from '@angular/core';
import { 
  NavController, 
  NavParams 
} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-uploadimage',
  templateUrl: 'uploadimage.html',
})
export class UploadImagePage {
  public photos:any
  public title:string
  public source: string = 'file'

  constructor(
    private photLibrary: PhotoLibrary,
    private translate: TranslateService,
    private sanitizer: DomSanitizer,

    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.translate.get(`UPLOADIMAGE.${this.navParams.data.title}`).subscribe(value => {
      this.title = value
    })
    
    this.photLibrary.requestAuthorization()
      .then(() => {
        console.log('OK')
        
        this.photLibrary.getLibrary().subscribe({
          next: library => {
            this.photos = library.map(item => {
              return item
            })
          }
        })
      })
      .catch(err => {
        console.log('KO', err)
        this.photos = [
          {
            creationDate: "Wed Aug 29 2018 12:49:17 GMT+0200 (CEST)",
            fileName: "IMG_20180829_104915_933.jpg",
            height: 0,
            id: "187060;/storage/emulated/0/Pictures/Instagram/IMG_20180829_104915_933.jpg",
            latitude: 0,
            longitude: 0,
            photoURL: "assets/imgs/perros.jpeg",
            thumbnailURL: "assets/imgs/perros.jpeg",
            width: 0
          },
          {
            creationDate: "Wed Aug 29 2018 12:49:17 GMT+0200 (CEST)",
            fileName: "IMG_20180829_104915_933.jpg",
            height: 0,
            id: "187060;/storage/emulated/0/Pictures/Instagram/IMG_20180829_104915_933.jpg",
            latitude: 0,
            longitude: 0,
            photoURL: "assets/imgs/perros.jpeg",
            thumbnailURL: "assets/imgs/perros.jpeg",
            width: 0
          },
          {
            creationDate: "Wed Aug 29 2018 12:49:17 GMT+0200 (CEST)",
            fileName: "IMG_20180829_104915_933.jpg",
            height: 0,
            id: "187060;/storage/emulated/0/Pictures/Instagram/IMG_20180829_104915_933.jpg",
            latitude: 0,
            longitude: 0,
            photoURL: "assets/imgs/perros.jpeg",
            thumbnailURL: "assets/imgs/perros.jpeg",
            width: 0
          },
          {
            creationDate: "Wed Aug 29 2018 12:49:17 GMT+0200 (CEST)",
            fileName: "IMG_20180829_104915_933.jpg",
            height: 0,
            id: "187060;/storage/emulated/0/Pictures/Instagram/IMG_20180829_104915_933.jpg",
            latitude: 0,
            longitude: 0,
            photoURL: "assets/imgs/perros.jpeg",
            thumbnailURL: "assets/imgs/perros.jpeg",
            width: 0
          }
        ]
      })
  }
}