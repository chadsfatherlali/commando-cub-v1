import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {
  LoadingController,
  NavController, 
  NavParams 
} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { DomSanitizer } from '@angular/platform-browser';
import {
  Camera,
  CameraOptions
} from '@ionic-native/camera';


@Component({
  selector: 'page-uploadimage',
  templateUrl: 'uploadimage.html',
})
export class UploadImagePage {
  public photos:any
  public title:string
  public source: string = 'file'

  private loader:any
  private user: any
  private folderToUpload: string = 'users'
  private cameraOptions: CameraOptions

  constructor(
    private translate: TranslateService,
    private camera: Camera,
    private storageFire: AngularFireStorage,

    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.user = this.navParams.data.email

    this.translate.get('UPLOADIMAGE.LOADING').subscribe(value => {
      this.loader = this.loadingCtrl.create({
        content: value
      })
    })
    
    this.translate.get(`UPLOADIMAGE.${this.navParams.data.title}`).subscribe(value => {
      this.title = value
    })

    this.cameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true 
    } 
  }

  getImageFrom (source) {
    this.cameraOptions.sourceType = (source === 'file')
      ? this.camera.PictureSourceType.PHOTOLIBRARY
      : this.camera.PictureSourceType.CAMERA

    this.takePhoto()
  }

  private takePhoto () {
    this.loader.present()

    const dataType = 'data:image/jpg;base64,'

    this.camera.getPicture(this.cameraOptions)
      .then(imageData => {
        console.log('OK')

        this.uploadImage(
          `${this.folderToUpload}/${this.user}/${new Date().getTime()}.jpg`,
          `${dataType}${imageData}`
        )
      })
      .catch(err => {
        console.log('KO', err)
        
        const imageData = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='

        this.uploadImage(
          `${this.folderToUpload}/${this.user}/${new Date().getTime()}.jpg`, 
          `${dataType}${imageData}`
        )
      })
  }

  private uploadImage (filePath: any, data: any) {
    const fileRef = this.storageFire.ref(filePath)
    const task = fileRef.putString(data, 'data_url')
    
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(value => {
            console.log(value)

            this.loader.dismiss();
          })
        })
      )
      .subscribe()
  }
}