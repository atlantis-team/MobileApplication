import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpRequestsProvider } from '../http-requests/http-requests';
import { ApplicationConfig, MY_CONFIG_TOKEN } from '../../app/app.config';

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
        "&response_type=id_token", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
      browserRef.addEventListener("loadstart", (event) => {
        if ((event.url).indexOf(oauthRedirectEndpoint) === 0) {
          browserRef.removeEventListener("exit", (event) => { });
          browserRef.close();
          if (event.url.includes('#id_token=')) {
            var responseToken = (event.url).split("#")[1].split("=")[1];
            resolve(responseToken);
          } else {
            reject("Problem authenticating with AD B2C");
          }
        }
      });
    })
  }

}
