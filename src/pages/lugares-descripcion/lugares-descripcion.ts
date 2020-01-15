import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { LugarMapaPage } from '../lugar-mapa/lugar-mapa';
import { PhotoViewer } from '@ionic-native/photo-viewer';

//providers
import { ActividadesProvider } from '../../providers/actividades/actividades';
import { ContactosProvider } from '../../providers/contactos/contactos';
import { PhotosProvider } from '../../providers/photos/photos';

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

  @ViewChild('TabsSlider') TabSlides : Slides 
  
  
  //data per slide
  reserva: any;
  contacto: any;
  fotos: Array<any>;
  actividades: Array<any>;

  // segment bar
  IndicatorBar : any = null
  tabs: any =[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public photoV: PhotoViewer) {

    this.tabs=["Descripción", "Fotos" ,"Actividades","Contacto"];
    this.reserva = navParams.data.reserva;
  }

  ionViewDidLoad() {
    this.IndicatorBar = document.getElementById("indicator");
  }

  getImage(reserva){
    if(reserva.imagenFondo.substring(0,5) != "https"){
      return `https://nica-v.herokuapp.com/multimedia/${reserva.imagenFondo}`
    }else{
      return reserva.imagenFondo
    }
  }

  bgImage = () =>`url(${this.reserva.imagenFondo})`

  openImage = (url: string) => { this.photoV.show(url) }

  getDescription = (descripcion: string) => descripcion.split("\n").join("<br />")

  openMapa() {
    let ubicacion = this.reserva.coordenadas.split(",").map(x => parseFloat(x))
    this.navCtrl.push(LugarMapaPage, {ubicacion: ubicacion});
  }

  async getFotos(){

  }
  async getContacto(){

  }
  async getActividades(){

  }

  /**
   * animation and setting
   * of swipeable slices
   */
  activeTab(i, tabs){
    return this.TabSlides  && ( this.TabSlides.getActiveIndex() === i || 
           (tabs.length -1 === i&& this.TabSlides.isEnd() ))
  }

  selectTab(index) {    
    this.IndicatorBar.style.webkitTransform = `translate3d(${100 * index}%,0,0)`;
    this.TabSlides.slideTo(index, 500);
  }

  updateIndicatorPosition() {
    // this condition is to avoid passing to incorrect index
    if( this.TabSlides.length() > this.TabSlides.getActiveIndex()) {
      this.IndicatorBar.style.webkitTransform = `translate3d( ${this.TabSlides.getActiveIndex() * 100}%,0,0)`;
    }
  
  }

  animateIndicator($event) {
  	if(this.IndicatorBar)
   	  this.IndicatorBar.style.webkitTransform = `translate3d(${ (($event.progress * (this.TabSlides.length()-1))*100) }%,0,0)`;
  }
}
