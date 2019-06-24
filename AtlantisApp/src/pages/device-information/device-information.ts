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

  public rawData = [
    {
      id: 0,
      value: 646531,
      type: "lol"
    },
    {
      id: 1,
      value: 97846513,
      type: "lol"
    },
    {
      id: 2,
      value: 849651,
      type: "lol"
    },
    {
      id: 3,
      value: 2164,
      type: "lol"
    },
    {
      id: 4,
      value: 4651,
      type: "lol"
    },
    {
      id: 5,
      value: 789,
      type: "lol"
    },
    {
      id: 6,
      value: 1561,
      type: "lol"
    },
    {
      id: 7,
      value: 6432,
      type: "lol"
    },
    {
      id: 8,
      value: 964823,
      type: "lol"
    },
    {
      id: 9,
      value: 9865,
      type: "lol"
    }
  ];

  constructor(public appCtrl: App, public navParams: NavParams) {
    this.deviceId = navParams.get('id');
  }
  
  popView(){
    this.appCtrl.getRootNav().setRoot(DeviceListingPage);
  }

}
