import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the HttpRequestsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpRequestsProvider {

  constructor(public http: HttpClient, public storage: Storage) {
  }

  post(url: string, body: any, urlEncoded?: Boolean): Promise<any> {
    let headerDict = {}
    headerDict["Access-Control-Request-Headers"] = 'x-requested-with';
    headerDict["Content-Type"] = urlEncoded ? 'application/x-www-form-urlencoded' : 'text/plain';

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(url, body, requestOptions)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  get(url: string, body: any = null): Promise<any> {
    var urlGet = url + this.BuildURLParametersString(body);
    return this.http.get(urlGet)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  public BuildURLParametersString(parameters: any): string {
    if (!parameters || parameters == null || Object.keys(parameters).length === 0)
      return "";

    var string = "?";

    var separator = "";
    Object.keys(parameters).forEach(key => {
      string += separator + decodeURI(key) + "=" + encodeURI(parameters[key]);
      separator = "&";
    });

    return string;
  }

  async checkUserLoggedIn() {
    return this.getTokenFromStorage()
      .then((result) => {
        if (result.length > 0) {
          return true;
        }
        else {
          return false;
        }
      })
      .catch((err) => {
        return false;
      });
  }

  //'Borrowed' from //https://angular.io/docs/ts/latest/guide/server-communication.html
  private extractData(res: Response) {
    //Return the data (or nothing)
    return res || {};
  }

  //'Borrowed' from //https://angular.io/docs/ts/latest/guide/server-communication.html
  private handleError(res: Response | any) {
    console.error('Entering handleError');
    console.dir(res);
    return Promise.reject(res);
  }

  public saveToken(token: string) {
    return this.storage.set("token", token);
  }

  public getTokenFromStorage() {
    return this.storage.get("token");
  }

  public clearStorage() {
    this.storage.remove("token");
  }

}
