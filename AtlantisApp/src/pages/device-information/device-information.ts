import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController, NavController, LoadingController } from 'ionic-angular';
import { MobileApiProvider } from '../../providers/mobile-api/mobile-api';

/**
 * Generated class for the DeviceInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-information',
  templateUrl: 'device-information.html',
})
export class DeviceInformationPage {

  deviceId: String;
  rawMetrics: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public mobileApi: MobileApiProvider
  ) {
    this.deviceId = navParams.get('deviceId');
  }

  //#region  Ionic methods
  ionViewDidLoad() {
    this.getRawMetrics();
  }
  //#endregion

  //#region Job methods
  getRawMetrics() {
    const loader = this.loadingCtrl.create({ content: "Loading ..." });
    loader.present();

    this.mobileApi.getDeviceRawMetrics(this.deviceId).then(
      data => {
        loader.dismiss();
        this.rawMetrics = data;
      },
      error => {
        loader.dismiss();
        return Promise.reject(error);
      }
    )
      .catch(error => {
        loader.dismiss();
        return Promise.reject(error);
      })
  }
  //#endregion

  //#region Interaction methods
  

  
  //#endregion

}
