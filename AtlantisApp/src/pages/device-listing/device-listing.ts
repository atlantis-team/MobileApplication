import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DeviceTabsPage } from '../device-tabs/device-tabs';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-device-listing',
  templateUrl: 'device-listing.html'
})
export class DeviceListingPage {

  public devices = [
    {
      id: 0,
      name: 'Presence sensor',
      deviceCanSendCommand: false
    },
    {
      id: 1,
      name: 'Temperature sensor',
      deviceCanSendCommand: false
    },
    {
      id: 2,
      name: 'Light sensor',
      deviceCanSendCommand: false
    },
    {
      id: 3,
      name: 'Atmoshpheric pressure sensor',
      deviceCanSendCommand: false
    },
    {
      id: 4,
      name: 'Humidity sensor',
      deviceCanSendCommand: false
    },
    {
      id: 5,
      name: 'Sound level sensor',
      deviceCanSendCommand: false
    },
    {
      id: 6,
      name: 'GPS sensor',
      deviceCanSendCommand: false
    },
    {
      id: 7,
      name: 'CO2 level sensor',
      deviceCanSendCommand: false
    },
    {
      id: 8,
      name: 'LED sensor',
      deviceCanSendCommand: true
    },
    {
      id: 9,
      name: 'Beeper',
      deviceCanSendCommand: true
    }
  ];

  constructor(public navCtrl: NavController) {

  }

  deviceSelected(deviceData) {
    this.navCtrl.push(DeviceTabsPage, {
      data: deviceData
    });
  }

  loginAzure() {
    this.navCtrl.push(LoginPage);
  }

}
