import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LugaresPage } from '../pages/lugares/lugares';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LugaresPage;
  showedAlert: boolean;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public alertCtrl: AlertController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString("#a2d252");
      this.splashScreen.hide();


      // Confirm exit
      this.platform.registerBackButtonAction(() => {
        if (this.nav.length() == 1) {
            if (!this.showedAlert) {
                this.confirmExitApp();
            } else {
                this.showedAlert = false;
            }
        }else{
          this.nav.pop();
        }
      });


    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  confirmExitApp() {
    this.showedAlert = true;
    let confirmAlert = this.alertCtrl.create({
      title: "Salir",
      message: "¿ Esta seguro que desea salir de la aplicación ?",
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            confirmAlert.dismiss().then(() => {
              this.showedAlert = false;
            })
            return false;
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            confirmAlert.dismiss().then(() =>{
              this.platform.exitApp();
            })
            return false
          }
        }
      ]
    });
    confirmAlert.present();
  }
}
