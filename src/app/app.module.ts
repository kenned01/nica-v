import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

import { LugarMapaPage } from '../pages/lugar-mapa/lugar-mapa';
import { LugaresPage } from '../pages/lugares/lugares';
import { LugaresDescripcionPage } from '../pages/lugares-descripcion/lugares-descripcion';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ReservasProvider } from '../providers/reservas/reservas';
import { DepartamentosProvider } from '../providers/departamentos/departamentos';

@NgModule({
  declarations: [
    MyApp,
    LugarMapaPage,
    LugaresPage,
    LugaresDescripcionPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LugarMapaPage,
    LugaresPage,
    LugaresDescripcionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ReservasProvider,
    DepartamentosProvider
  ]
})
export class AppModule {}
