import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-device-listing',
  templateUrl: 'device-listing.html'
})
export class DeviceListingPage {

  public devices = [
    {
      id: 0,
      name: 'Presence sensor'
    },
    {
      id: 1,
      name: 'Temperature sensor'
    },
    {
      id: 2,
      name: 'Light sensor'
    },
    {
      id: 3,
      name: 'Atmoshpheric pressure sensor'
    },
    {
      id: 4,
      name: 'Humidity sensor'
    },
    {
      id: 5,
      name: 'Sound level sensor'
    },
    {
      id: 6,
      name: 'GPS sensor'
    },
    {
      id: 7,
      name: 'CO2 level sensor'
    },
    {
      id: 8,
      name: 'LED sensor'
    },
    {
      id: 9,
      name: 'Beeper'
    }
  ];

  constructor(public navCtrl: NavController) {

  }

  deviceSelected(deviceId) {
    console.log(deviceId);
  }

}
