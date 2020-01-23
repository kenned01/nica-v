import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

//providers
import { ReservasProvider } from '../providers/reservas/reservas';
import { DepartamentosProvider } from '../providers/departamentos/departamentos';
import { PhotosProvider } from '../providers/photos/photos';
import { ContactosProvider } from '../providers/contactos/contactos';
import { ActividadesProvider } from '../providers/actividades/actividades';

//native components
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Toast } from '@ionic-native/toast';
import { GoogleMaps } from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PhotoViewer,
    Toast,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ReservasProvider,
    DepartamentosProvider,
    PhotosProvider,
    ContactosProvider,
    ActividadesProvider
  ]
})
export class AppModule {}
