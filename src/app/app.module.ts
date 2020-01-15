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
import { PhotosProvider } from '../providers/photos/photos';

import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ContactosProvider } from '../providers/contactos/contactos';
import { ActividadesProvider } from '../providers/actividades/actividades';

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
    PhotoViewer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ReservasProvider,
    DepartamentosProvider,
    PhotosProvider,
    ContactosProvider,
    ActividadesProvider
  ]
})
export class AppModule {}
