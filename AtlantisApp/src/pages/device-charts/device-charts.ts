import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, App, NavController, AlertController, LoadingController } from 'ionic-angular';
import { DeviceListingPage } from '../device-listing/device-listing';
import { Chart } from 'chart.js';
import { MobileApiProvider } from '../../providers/mobile-api/mobile-api';

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
  deviceId: String;
  period: any = 'hour';

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public mobileApi: MobileApiProvider
  ) {

  }

  //#region Ionic methods

  ionViewDidLoad() {
    this.getCalcMetrics();
  }

  //#endregion

  //#region Job methods

  getCalcMetrics() {
    const loader = this.loadingCtrl.create({ content: "Loading ..." });
    loader.present();

    this.mobileApi.getDeviceCalcMetrics(this.deviceId, this.period).then(
      data => {
        loader.dismiss();
        console.log(data.map(dat => ({ t: dat.date.toISOString().substring(0, 10), y: dat.value })));
        this.barChart = new Chart(this.chartCanvas.nativeElement, {
          type: 'line',
          data: {
            labels: data.map(dat => dat.date.toISOString().substring(0, 10)),
            datasets: [
              {
                //label: "Previous metrics",
                data: data.map(dat => ({ t: dat.date.toISOString().substring(0, 10), y: dat.value })),
                backgroundColor: "rgba(72, 138, 255, 0.6)",
                borderWidth: 1
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            tooltips: {
              callbacks: {
                label: function (tooltipItem) {
                  return tooltipItem.yLabel;
                }
              }
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      },
      error => {
        loader.dismiss();
        return Promise.reject(error);
      }
    )
      .catch(error => {
        loader.dismiss();
        return Promise.reject(error);
      })
  }

  //#endregion

  //#region Interaction methods

  onChangePeriod($event) {
    console.log("Changed period");
    this.getCalcMetrics();
  }

  //#endregion

}
