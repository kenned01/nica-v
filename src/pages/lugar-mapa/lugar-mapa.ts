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

  ubicacion: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    this.ubicacion = this.navParams.data.ubicacion;
    this.setMap();

  }

  setMap(){
    let map = document.getElementById("map")
    map.innerHTML = this.ubicacion;
  }
  
}
