import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, App } from 'ionic-angular';
import { DeviceListingPage } from '../device-listing/device-listing';
import { Chart } from 'chart.js';

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

  @ViewChild('chartCanvas') chartCanvas;

  barChart: any;

  constructor(public appCtrl: App, public navParams: NavParams) {
  }

  popView() {
    this.appCtrl.getRootNav().setRoot(DeviceListingPage);
  }

  ionViewDidLoad() {

    this.barChart = new Chart(this.chartCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    });

  }

}
