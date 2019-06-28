import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, AlertController, LoadingController } from 'ionic-angular';
import { MobileApiProvider } from '../../providers/mobile-api/mobile-api';

/**
 * Generated class for the DeviceCommandsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-commands',
  templateUrl: 'device-commands.html',
})
export class DeviceCommandsPage {

  deviceId: String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public mobileApi: MobileApiProvider,
    public alertCtrl: AlertController
  ) {
    this.deviceId = navParams.get('deviceId');
  }

  switch(bool) {
    const loader = this.loadingCtrl.create({ content: "Loading ..." });
    loader.present();

    this.mobileApi.sendCommandToDevice(this.deviceId, bool).then(
      data => {
        loader.dismiss();

        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: data.message,
          buttons: ['Dismiss']
        });
        alert.present();
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

}
