import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { DeviceTabsPage } from '../device-tabs/device-tabs';
import { LoginPage } from '../login/login';
import { MobileApiProvider } from '../../providers/mobile-api/mobile-api';

@Component({
  selector: 'page-device-listing',
  templateUrl: 'device-listing.html'
})
export class DeviceListingPage {

  public devices: Array<any>;

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public mobileApi: MobileApiProvider
  ) {

  }

  //#region Ionic methods

  ionViewDidLoad() {
    console.log('ionViewDidLoad devicesListPage');

    this.getUser().then(
      data => {
        this.devices = data.devices;
      },
      error => {
        this.alertController.create({
          title: 'Error',
          message: error,
          buttons: [{ text: 'Ok' }]
        }).present();
      })
  }

  //#endregion

  //#region Job methods

  getUser(): Promise<any> {
    const loader = this.loadingCtrl.create({ content: "Loading ..." });
    loader.present();

    return this.mobileApi.getUser().then(
      data => {
        loader.dismiss();
        return data;
      },
      error => {
        loader.dismiss();
        return Promise.reject(error);
      }
    )
  }

  //#endregion

  //#region Interaction methods

  deviceSelected(deviceData) {
    this.navCtrl.push(DeviceTabsPage, {
      data: deviceData
    });
  }

  loginAzure() {
    this.navCtrl.push(LoginPage);
  }

  //#endregion

}
