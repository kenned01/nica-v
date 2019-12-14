import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LugarMapaPage } from '../lugar-mapa/lugar-mapa';
/**
 * Generated class for the LugaresDescripcionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lugares-descripcion',
  templateUrl: 'lugares-descripcion.html',
})
export class LugaresDescripcionPage {

  segment = "descripcion";
  lugar: any;

  imagenes = [
    'assets/imgs/Masaya.jpg',
    'assets/imgs/cañon-somoto.jpg',
    'assets/imgs/Monbacho.jpg'
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.pais_Prueba = navParams.data.item;
    this.lugar = navParams.data.lugar;
  }

  ionViewDidLoad() {
  }

  bgImage(lugar){
    return "url('" + lugar.img + "')";
  }
  openCaptionImage(){
    console.log('caption image openned at ', this.lugar.img )
  }

  openMapa() {
    console.log('map openned at lat: ' + this.lugar.ubicacion.lat + ' and lng:' + this.lugar.ubicacion.long);
    this.navCtrl.push(LugarMapaPage, {ubicacion: this.lugar.ubicacion});
  }
}
