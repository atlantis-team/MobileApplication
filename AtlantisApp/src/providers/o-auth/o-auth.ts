import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpRequestsProvider } from '../http-requests/http-requests';
import { ApplicationConfig, MY_CONFIG, MY_CONFIG_TOKEN } from '../../app/app.config';

/*
  Generated class for the OAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OAuthProvider extends HttpRequestsProvider {

  private client_id: string;
  private client_secret: string;
  private oauthBaseEndpoint: string;
  private oauthBaseEndpointMainParamName: string;
  private oauthBaseEndpointMainParamValue: string;
  private oauthRedirectEndpoint: string;

  constructor(
    public http: HttpClient,
    public storage: Storage,
    @Inject(MY_CONFIG_TOKEN) configuration: ApplicationConfig
  ) {
    super(http, storage);
    console.log('Hello OAuthAPI Provider');
    this.client_id = configuration.atlantisApp.client_id;
    this.client_secret = configuration.atlantisApp.client_secret;
    this.oauthBaseEndpoint = configuration.atlantisApp.oauthBaseEndpoint;
    this.oauthBaseEndpointMainParamName = configuration.atlantisApp.oauthBaseEndpointMainParam.paramName;
    this.oauthBaseEndpointMainParamValue = configuration.atlantisApp.oauthBaseEndpointMainParam.paramValue;
    this.oauthRedirectEndpoint = configuration.atlantisApp.oauthRedirectEndpoint;
  }

  authorize(window): Promise<any> {
    var client_id: string = this.client_id;
    var oauthBaseEndpoint: string = this.oauthBaseEndpoint;
    var oauthBaseEndpointMainParamName: string = this.oauthBaseEndpointMainParamName;
    var oauthBaseEndpointMainParamValue: string = this.oauthBaseEndpointMainParamValue;
    var oauthRedirectEndpoint: string = this.oauthRedirectEndpoint;
    return new Promise(function (resolve, reject) {
      var browserRef = window.cordova.InAppBrowser.open(oauthBaseEndpoint + "/authorize" +
        "?" + oauthBaseEndpointMainParamName + "=" + oauthBaseEndpointMainParamValue +
        "&client_id=" + client_id +
        "&redirect_uri=" + oauthRedirectEndpoint +
        "&scope=openid" +
        "&response_type=code", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
      browserRef.addEventListener("loadstart", (event) => {
        if ((event.url).indexOf(oauthRedirectEndpoint) === 0) {
          browserRef.removeEventListener("exit", (event) => { });
          browserRef.close();
          var responseParameters = ((event.url).split("?")[1]).split("&");
          var parsedResponse = {};
          for (var i = 0; i < responseParameters.length; i++) {
            parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
          }
          if (parsedResponse["code"] !== undefined && parsedResponse["code"] !== null) {
            resolve(parsedResponse);
          } else {
            reject("Problem authenticating with Legrand");
          }
        }
      });
      // browserRef.addEventListener("exit", function(event) {
      //     reject("The Legrand sign in flow was canceled");
      // });
    })
  }

  getTokens(authorizationCode): Promise<any> {
    const requestTokenBody = new HttpParams()
      .set(this.oauthBaseEndpointMainParamName, this.oauthBaseEndpointMainParamValue)
      .set('client_id', this.client_id)
      .set('grant_type', "authorization_code")
      .set('code', authorizationCode)
      .set('client_secret', this.client_secret);
    return this.post(this.oauthBaseEndpoint + "/token", requestTokenBody, true).then(
      data => {
        return {
          token: data.access_token,
          refreshToken: data.refresh_token
        }
      },
      error => {
        Promise.reject('Could not get Token using Legrand\'s API');
      }
    )
  }

  refreshToken(): Promise<any> {
    return this.getRefreshTokenFromStorage().then(
      refreshToken => {
        const requestTokenBody = new HttpParams()
          .set(this.oauthBaseEndpointMainParamName, this.oauthBaseEndpointMainParamValue)
          .set('client_id', this.client_id)
          .set('grant_type', "refresh_token")
          .set('refresh_token', refreshToken)
          .set('client_secret', this.client_secret);
        console.log(requestTokenBody);
        return this.post(this.oauthBaseEndpoint + "/token", requestTokenBody, true).then(
          data => {
            console.log(data);
            return this.saveToken(data.access_token).then(
              () => {
                return this.saveRefreshToken(data.refresh_token).then(
                  () => {
                    Promise.resolve();
                  }, error => { Promise.reject('Could not save refreshToken in storage'); }
                )
              }, error => { Promise.reject('Could not save token in storage'); }
            )
          }, error => { Promise.reject('Could not refresh Token using Legrand\'s API'); }
        )
      }, error => { Promise.reject("could not get refreshToken from storage"); }
    )
  }

}
