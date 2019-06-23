import { Component } from '@angular/core';
import { IonicPage, NavParams, App } from 'ionic-angular';
import { DeviceListingPage } from '../device-listing/device-listing';

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

  deviceId: number;

  constructor(public appCtrl: App, public navParams: NavParams) {
    this.deviceId = navParams.get('id');
  }
  
  popView(){
    this.appCtrl.getRootNav().setRoot(DeviceListingPage);
  }

}
