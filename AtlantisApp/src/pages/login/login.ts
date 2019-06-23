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
        success => {
          let loader = this.loadingCtrl.create({
            content: "Connection"
          });
          //Show the loading indicator
          loader.present();

          this.OAuthProvider.getTokens(success.code).then(
            tokens => {
              this.OAuthProvider.saveToken(tokens.token)
                .then((result) => {
                  this.OAuthProvider.saveRefreshToken(tokens.refreshToken)
                    .then(result2 => {
                      loader.dismiss();
                      console.log("SUCCESS LOGIN");
                    }).catch(err => { this.loginErrorHandler(err, loader) })
                })
                .catch((err) => { this.loginErrorHandler(err, loader) });
            },
            error => { this.loginErrorHandler(error, loader) }
          )
        },
        error => {
          console.error('Error Login ' + error);
        }
        );
    });
  }

  loginErrorHandler(err, loader) {
    loader.dismiss();
    console.error('Error Login ' + err);
  }

}
