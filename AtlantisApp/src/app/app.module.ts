import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { OAuthProvider } from '../providers/o-auth/o-auth';
import { HttpRequestsProvider } from '../providers/http-requests/http-requests';
import { IonicStorageModule } from '@ionic/storage';
import { MY_CONFIG_TOKEN, MY_CONFIG } from './app.config';
import { DeviceListingPage } from '../pages/device-listing/device-listing';
import { DeviceInformationPage } from '../pages/device-information/device-information';
import { DeviceChartsPage } from '../pages/device-charts/device-charts';
import { DeviceCommandsPage } from '../pages/device-commands/device-commands';
import { DeviceTabsPage } from '../pages/device-tabs/device-tabs';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DeviceListingPage,
    DeviceTabsPage,
    DeviceInformationPage,
    DeviceChartsPage,
    DeviceCommandsPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DeviceListingPage,
    DeviceTabsPage,
    DeviceInformationPage,
    DeviceChartsPage,
    DeviceCommandsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpRequestsProvider,
    OAuthProvider,
    {provide: MY_CONFIG_TOKEN, useValue: MY_CONFIG},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
