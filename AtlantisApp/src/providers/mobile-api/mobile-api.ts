import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { OAuthProvider } from '../o-auth/o-auth';
import { MY_CONFIG_TOKEN, ApplicationConfig } from '../../app/app.config';
import { Storage } from '@ionic/storage';

class User {
  userId: string;
  firstname: string;
  lastname: string;
  devices: Array<Device>;

  constructor(obj?: any) {
    this.userId = obj && obj.userId || null;
    this.firstname = obj && obj.firstname || null;
    this.lastname = obj && obj.lastname || null;
    this.devices = obj && obj.devices.map(device => { return new Device(device); }) || [];
  }
}

class Device {
  deviceId: String;
  name: string;
  type: string;
  unit: string;
  calcMetrics: Array<Number>;
  rawMetrics: Array<Number>;

  constructor(obj?: any) {
    this.deviceId = obj && obj.deviceId || null;
    this.name = obj && obj.name || null;
    this.type = obj && obj.type || null;
    this.unit = obj && obj.unit || null;
    this.calcMetrics = [];
    this.rawMetrics = [];
  }
}

class RawMetric {
  deviceId: string;
  date: Date;
  value: string;

  constructor(obj?: any) {
    this.deviceId = obj && obj.deviceId || null;
    this.date = obj && obj.date && new Date(obj.date) || null;
    this.value = obj && obj.value || null;
  }
}

class CalcMetric {
  id: string;
  deviceId: string;
  dateTimeStart: Date;
  dateTimeEnd: Date;
  value: number;
  dataType: string;

  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.deviceId = obj && obj.deviceId || null;
    this.dateTimeStart = obj && obj.dateTimeStart && new Date(obj.dateTimeStart) || null;
    this.dateTimeEnd = obj && obj.dateTimeEnd && new Date(obj.dateTimeEnd) || null;
    this.value = obj && obj.value || null;
    this.dataType = obj && obj.dataType || null;
  }
}

/*
  Generated class for the MobileApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MobileApiProvider extends OAuthProvider {

  private ApiEndPoint: string;

  constructor(
    public http: HttpClient,
    public storage: Storage,
    @Inject(MY_CONFIG_TOKEN) configuration: ApplicationConfig
  ) {
    super(http, storage, configuration);
    console.log('Hello MobileAPI Provider');
    this.ApiEndPoint = configuration.atlantisApp;
  }

  private requestMobileAPI(url: string, errorMessage: string, body?: object, post: boolean = false): Promise<any> {
    return this.getTokenFromStorage().then(
      token => {
        if (!body) body = {};
        body["token"] = token;
        if (post)
          return this.post(url, body).then(
            data => { return data; },
            (error: HttpErrorResponse) => {
              console.log(error, url, errorMessage, body, post);
              return Promise.reject("An error occured");
            }
          );
        else
          return this.get(url + this.BuildURLParametersString(body)).then(
            data => { return data },
            (error: HttpErrorResponse) => {
              console.log(error, url, errorMessage, body, post);
              return Promise.reject("An error occured");
            }
          );
      },
      error => { return Promise.reject("Could not get token from storage"); }
    );
  }

  getUser(): Promise<User> {
    return this.requestMobileAPI(this.ApiEndPoint + "/getUser", "Could not get user from MobileAPI").then(
      data => {
        return new User(data);
      },
      error => {
        return Promise.reject(error);
      }
    )
  }

  createUser(firstname: string, lastname: string): Promise<User> {
    var body = {
      firstname: firstname,
      lastname: lastname
    };
    return this.requestMobileAPI(this.ApiEndPoint + "/createUser", "Could not create user using MobileAPI", body, true).then(
      data => {
        return new User(data);
      },
      error => { return Promise.reject(error); }
    )
  }

  getDeviceRawMetrics(device: Device, timestamp: number): Promise<Array<RawMetric>> {
    var body = {
      deviceId: device.deviceId,
      timestamp: timestamp
    };
    return this.requestMobileAPI(this.ApiEndPoint + '/getDeviceRawMetrics', "Could not get user raw metrics from MobileAPI", body).then(
      data => {
        var rawMetrics = data.map(rawMetric => { return new RawMetric(rawMetric) });
        return rawMetrics;
      },
      error => {
        return Promise.reject(error);
      }
    )
  }

  getDeviceCalcMetrics(device: Device, timestamp: number): Promise<Array<CalcMetric>> {
    var body = {
      deviceId: device.deviceId,
      timestamp: timestamp
    };
    return this.requestMobileAPI(this.ApiEndPoint + '/getDeviceCalcMetrics', "Could not get user calc metrics from MobileAPI", body).then(
      data => {
        var calcMetrics = data.map(calcMetric => { return new CalcMetric(calcMetric) });
        return calcMetrics;
      },
      error => {
        return Promise.reject(error);
      }
    )
  }

  sendCommandToDevice(device: Device, command: any): Promise<any> {
    var body = {
      deviceId: device.deviceId,
      command: command
    };
    return this.requestMobileAPI(this.ApiEndPoint + '/sendMessageToDevice', "Could not send command to device using MobileAPI", body, true).then(
      data => {
        return data;
      },
      error => {
        return Promise.reject(error);
      }
    )
  }

}
