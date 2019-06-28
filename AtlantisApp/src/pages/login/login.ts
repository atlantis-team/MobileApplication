import { Component } from '@angular/core';
import { LoadingController, NavController, Platform, AlertController } from 'ionic-angular';
import { OAuthProvider } from '../../providers/o-auth/o-auth';
import { DeviceListingPage } from '../device-listing/device-listing';
import { HttpRequestsProvider } from '../../providers/http-requests/http-requests';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public navCtrl: NavController,
    public OAuthProvider: OAuthProvider,
    public alertController: AlertController,
    public httpProvider: HttpRequestsProvider
  ) { }

  login() {
    this.platform.ready().then(() => {
      this.OAuthProvider.authorize(window).then(
        token => {
          this.OAuthProvider.saveToken(token)
            .then((result) => {
              this.navCtrl.setRoot(DeviceListingPage);
            })
            .catch((err) => { this.loginErrorHandler(err) });
        },
        error => {
          this.loginErrorHandler(error)
        }
      );
    });
  }

  loginErrorHandler(err) {
    console.error('Error Login ' + err);
    this.alertController.create({
      title: 'Error',
      message: err,
      buttons: [{ text: 'Ok' }]
    }).present();
  }

  ignoreLogin() {
    this.navCtrl.setRoot(DeviceListingPage);
  }

}
