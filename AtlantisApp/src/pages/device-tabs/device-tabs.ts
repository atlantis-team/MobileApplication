import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeviceInformationPage } from '../device-information/device-information';
import { DeviceChartsPage } from '../device-charts/device-charts';
import { DeviceCommandsPage } from '../device-commands/device-commands';

/**
 * Generated class for the DeviceTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-tabs',
  templateUrl: 'device-tabs.html',
})
export class DeviceTabsPage {

  deviceInformationPage = DeviceInformationPage;
  deviceChartsPage = DeviceChartsPage;
  deviceCommandsPage = DeviceCommandsPage;

  deviceData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.deviceData = navParams.get('data');
  }

}
