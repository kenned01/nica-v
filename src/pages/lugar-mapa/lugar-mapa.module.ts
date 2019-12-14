import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LugarMapaPage } from './lugar-mapa';

@NgModule({
  declarations: [
    LugarMapaPage,
  ],
  imports: [
    IonicPageModule.forChild(LugarMapaPage),
  ],
})
export class LugarMapaPageModule {}
