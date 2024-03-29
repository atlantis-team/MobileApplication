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
  ID: number;
  User_OID: string;
  DeviceName: string;

  constructor(obj?: any) {
    this.ID = obj && obj.ID || null;
    this.User_OID = obj && obj.User_OID || null;
    this.DeviceName = obj && obj.DeviceName || null;
  }
}

class RawMetric {
  deviceId: string;
  date: Date;
  value: number;

  constructor(obj?: any) {
    this.deviceId = obj && obj.deviceId || null;
    this.date = obj && obj.date && new Date(obj.date) || null;
    this.value = obj && obj.value || null;
  }
}

class CalcMetric {
  deviceId: string;
  date: Date;
  value: number;
  dataType: string;

  constructor(obj?: any) {
    this.deviceId = obj && obj.deviceId || null;
    this.date = obj && obj.date && new Date(obj.date) || null;
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
    this.ApiEndPoint = configuration.mobileApiEndpoint;
  }

  private requestMobileAPI(url: string, errorMessage: string, body?: object, post: boolean = false): Promise<any> {
    return this.getTokenFromStorage().then(
      token => {
        if (token == null) {
          return Promise.reject("Could not get token from storage, please logout and login again");
        }
        if (!body) body = {};
        body["token"] = token;
        if (post)
          return this.post(url, body).then(
            data => { return data; },
            (error: HttpErrorResponse) => {
              return Promise.reject("An error occured");
            }
          );
        else
          return this.get(url + this.BuildURLParametersString(body)).then(
            data => { return data },
            (error: HttpErrorResponse) => {
              return Promise.reject("An error occured");
            }
          );
      },
      error => { return Promise.reject("Could not get token from storage, please logout and login again"); }
    );
  }

  getUser(): Promise<User> {
    /*return Promise.resolve(
      new User({
        userId: "1",
        firstname: "Raphael",
        lastname: "Octau",
        devices: [
          {
            deviceId: "1",
            name: "LS 2000",
            type: "Light sensor",
            unit: "lux"
          },
          {
            deviceId: "2",
            name: "ATM Test1",
            type: "Atmospheric sensor",
            unit: "hPa"
          },
          {
            deviceId: "3",
            name: "Sound S56",
            type: "Sound sensor",
            unit: "dB"
          },
          {
            deviceId: "4",
            name: "BipBip 2002",
            type: "Beeper",
          },
          {
            deviceId: "5",
            name: "LED light WOW",
            type: "LED",
          },
          {
            deviceId: "6",
            name: "Temp 3000",
            type: "Temperature sensor",
            unit: "°C"
          },
        ]
      })
    );*/
    console.log('GET USER')
    return this.requestMobileAPI(this.ApiEndPoint + "/getDevices", "Could not get user from MobileAPI", null, true).then(
      data => {
        return new User(data);
      },
      error => {
        return Promise.reject(error);
      }
    )
  }

  getDeviceRawMetrics(deviceId: String): Promise<Array<RawMetric>> {
    /*return Promise.resolve(
      [
        {
          deviceId: "1",
          date: new Date(),
          value: 5000
        },
        {
          deviceId: "1",
          date: new Date(),
          value: 5178
        },
        {
          deviceId: "1",
          date: new Date(),
          value: 5287
        },
        {
          deviceId: "1",
          date: new Date(),
          value: 5327
        },
        {
          deviceId: "1",
          date: new Date(),
          value: 5463
        },
        {
          deviceId: "1",
          date: new Date(),
          value: 5532
        },
      ]
    );*/
    var body = {
      deviceId: deviceId,
    };
    return this.requestMobileAPI(this.ApiEndPoint + '/getDeviceRawMetrics', "Could not get user raw metrics from MobileAPI", body, true).then(
      data => {
        var rawMetrics = data.map(rawMetric => { return new RawMetric(rawMetric) });
        return rawMetrics;
      },
      error => {
        return Promise.reject(error);
      }
    )
  }

  getDeviceCalcMetrics(deviceId: String, timestampStart: String, timestampEnd: String, timeInterval: string): Promise<Array<CalcMetric>> {
    /*return Promise.resolve(
      [
        {
          deviceId: "1",
          date: new Date(),
          value: 5000,
          dataType: ""
        },
        {
          deviceId: "1",
          date: new Date(),
          value: 5178,
          dataType: ""
        },
        {
          deviceId: "1",
          date: new Date(),
          value: 5287,
          dataType: ""
        },
        {
          deviceId: "1",
          date: new Date(),
          value: 5327,
          dataType: ""
        },
        {
          deviceId: "1",
          date: new Date(),
          value: 5463,
          dataType: ""
        },
        {
          deviceId: "1",
          date: new Date(),
          value: 5532,
          dataType: ""
        },
      ]
    );*/
    var body = {
      deviceId: deviceId,
      timestampStart: timestampStart,
      timestampEnd: timestampEnd,
      timeInterval: timeInterval
    };
    return this.requestMobileAPI(this.ApiEndPoint + '/getDeviceCalcMetrics', "Could not get user calc metrics from MobileAPI", body, true).then(
      data => {
        var calcMetrics = data.map(calcMetric => { return new CalcMetric(calcMetric) });
        return calcMetrics;
      },
      error => {
        return Promise.reject(error);
      }
    )
  }

  sendCommandToDevice(deviceId: String, command: any): Promise<any> {
    /*return Promise.resolve({
      message: "LED switched " + (command == true ? "ON" : "OFF") + " successfully"
    });*/
    var body = {
      deviceId: deviceId,
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
