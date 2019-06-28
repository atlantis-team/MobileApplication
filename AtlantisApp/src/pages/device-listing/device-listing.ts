import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { DeviceTabsPage } from '../device-tabs/device-tabs';
import { MobileApiProvider } from '../../providers/mobile-api/mobile-api';
import { HttpRequestsProvider } from '../../providers/http-requests/http-requests';
import { LoginPage } from '../login/login';

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
    public mobileApi: MobileApiProvider,
    public httpProvider: HttpRequestsProvider
  ) {

  }

  //#region Ionic methods

  ionViewDidLoad() {
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
    /*this.httpProvider.getTokenFromStorage().then(
      token => {
        if (token == null) {
          this.alertController.create({
            title: 'Error',
            message: 'Could not get token from storage, please logout and login again',
            buttons: [{ text: 'Ok' }]
          }).present();
          return;
        }*/
        this.navCtrl.push(DeviceTabsPage, {
          data: deviceData
        });
      /*},
      error => {
        this.alertController.create({
          title: 'Error',
          message: 'Could not get token from storage, please logout and login again',
          buttons: [{ text: 'Ok' }]
        }).present();
      }
    );*/
  }

  logout() {
    this.httpProvider.clearStorage();
    this.navCtrl.setRoot(LoginPage);
  }

  //#endregion

}
