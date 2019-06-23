import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceChartsPage } from './device-charts';

@NgModule({
  declarations: [
    DeviceChartsPage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceChartsPage),
  ],
})
export class DeviceChartsPageModule {}
