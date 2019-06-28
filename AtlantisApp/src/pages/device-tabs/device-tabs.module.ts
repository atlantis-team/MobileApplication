import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceTabsPage } from './device-tabs';

@NgModule({
  declarations: [
    DeviceTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceTabsPage),
  ],
})
export class DeviceTabsPageModule {}
