import { Component } from '@angular/core';
import { LoadingController, NavController, Platform } from 'ionic-angular';
import { OAuthProvider } from '../../providers/o-auth/o-auth';

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
  ) { }

  login() {
    this.platform.ready().then(() => {
      this.OAuthProvider.authorize(window).then(
        tokens => {
          this.OAuthProvider.saveToken(tokens.token)
            .then((result) => {
              this.OAuthProvider.saveRefreshToken(tokens.refreshToken)
                .then(result2 => {
                  console.log("SUCCESS LOGIN");
                }).catch(err => { this.loginErrorHandler(err) })
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
  }

}
