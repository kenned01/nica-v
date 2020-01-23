import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LugarMapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lugar-mapa',
  templateUrl: 'lugar-mapa.html',
})
export class LugarMapaPage {

  ubicacion = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ubicacion = navParams.data.ubicacion;
    console.log(this.ubicacion);
  }

  ionViewDidLoad() {
  }

}
