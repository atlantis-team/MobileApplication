import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceCommandsPage } from './device-commands';

@NgModule({
  declarations: [
    DeviceCommandsPage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceCommandsPage),
  ],
})
export class DeviceCommandsPageModule {}
