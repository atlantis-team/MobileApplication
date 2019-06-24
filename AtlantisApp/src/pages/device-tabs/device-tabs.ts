import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  deviceData: any;
  
  tabAction: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.deviceData = navParams.get('data');
    this.tabAction = "data";
  }

}
