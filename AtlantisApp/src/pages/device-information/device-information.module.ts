import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceInformationPage } from './device-information';

@NgModule({
  declarations: [
    DeviceInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceInformationPage),
  ],
})
export class DeviceInformationPageModule {}
