import { Component } from '@angular/core';
import { IonicPage, NavParams, App } from 'ionic-angular';
import { DeviceListingPage } from '../device-listing/device-listing';

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

  constructor(public appCtrl: App, public navParams: NavParams) {
  }

}
