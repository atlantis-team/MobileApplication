import { Component } from '@angular/core';
import { IonicPage, NavParams, App } from 'ionic-angular';
import { DeviceListingPage } from '../device-listing/device-listing';

/**
 * Generated class for the DeviceChartsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-charts',
  templateUrl: 'device-charts.html',
})
export class DeviceChartsPage {

  constructor(public appCtrl: App, public navParams: NavParams) {
  }
  
  popView(){
    this.appCtrl.getRootNav().setRoot(DeviceListingPage);
  }

}
