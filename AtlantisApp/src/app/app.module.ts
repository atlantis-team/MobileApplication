import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { DeviceListingPage } from '../pages/device-listing/device-listing';
import { DeviceInformationPage } from '../pages/device-information/device-information';
import { DeviceChartsPage } from '../pages/device-charts/device-charts';
import { DeviceCommandsPage } from '../pages/device-commands/device-commands';
import { DeviceTabsPage } from '../pages/device-tabs/device-tabs';

@NgModule({
  declarations: [
    MyApp,
    DeviceListingPage,
    DeviceTabsPage,
    DeviceInformationPage,
    DeviceChartsPage,
    DeviceCommandsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DeviceListingPage,
    DeviceTabsPage,
    DeviceInformationPage,
    DeviceChartsPage,
    DeviceCommandsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
