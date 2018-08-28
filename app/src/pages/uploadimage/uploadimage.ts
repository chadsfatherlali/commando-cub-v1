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
  public photosThumbs:any
  public title:string
  public source: string = 'file'

  constructor(
    private photLibrary: PhotoLibrary,
    private translate: TranslateService,
    private sanitizer: DomSanitizer,

    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    let _self = this;

    this.translate.get(`UPLOADIMAGE.${this.navParams.data.title}`).subscribe(value => {
      this.title = value
    })
    
    this.photLibrary.requestAuthorization()
      .then(() => {
        console.log('OK')
        
        this.photLibrary.getLibrary().subscribe({
          next: library => {
            library.forEach(item => {
              _self.photosThumbs.push(_self.sanitizer.bypassSecurityTrustUrl(item.thumbnailURL))
            })
          }
        })
      })
      .catch(err => {
        console.log('KO', err)
      })
  }
}