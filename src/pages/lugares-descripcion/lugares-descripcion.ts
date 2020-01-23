import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
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
  IndicatorBar : any = null;
  tabs: any = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public photoV: PhotoViewer, public toast: Toast,
    public fotosP: PhotosProvider, public contactoP: ContactosProvider, public actividadP: ActividadesProvider) {

    this.tabs=["Descripción", "Fotos" ,"Actividades","Contacto"];
    this.reserva = navParams.data.reserva;
  }

  async ionViewDidLoad() {
    this.IndicatorBar = document.getElementById("indicator");
    await this.getFotos()
    await this.getActividades()
    await this.getContacto()
  }

  getImage(uri: string){
    if(uri.substring(0,5) != "https"){
      return `https://nica-v.herokuapp.com/multimedia/${uri}`
    }else{
      return uri
    }
  }

  bgImage() {
    if(this.reserva.imagenFondo.substring(0,5) != "https"){
      return `url(https://nica-v.herokuapp.com/multimedia/${this.reserva.imagenFondo})`;
    }else{
      return `url(${this.reserva.imagenFondo})`;
    }
  }
  
  openImage(url: string) { 
    this.photoV.show(url) 
  }

  getDescription(descripcion: string) {
    return descripcion.split("\n").join("<br />")
  }
  
  setheight(){
    return `${document.querySelector("[col-3]").clientWidth}px`
  }

  openMapa() {
    let ubicacion = this.reserva.coordenadas.split(",").map(x => parseFloat(x))
    this.navCtrl.push('LugarMapaPage', {ubicacion: ubicacion});
  }

  async getFotos(){
    let {data, error} = await this.fotosP.getFotos(this.reserva.id);

    if (error){
      this.toast.showShortBottom('No se pueden mostrar las fotos').subscribe( x=> {});
    }

    if (!error){
      this.fotos = data;
    }
  }
  
  isFotoEmpty(): boolean{

    if (this.fotos == null){
      return true;
    }

    if (this.fotos.length > 0){
      return false;
    }else{
      return true;
    }

  }

  async getContacto(){
    let { error, data } = await this.contactoP.getContacto(this.reserva.id)

    if(error){
      this.toast.showShortBottom("error al obtener el contacto de la reserva").subscribe( x=> {});
    }

    if(!error){
      this.contacto = data
    }
  }

  isContactoEmpty(): boolean{

    if (this.contacto == null){
      return true;
    }else{
      return false;
    }
  }

  async getActividades(){
    let { error, data } = await this.actividadP.getActividades(this.reserva.id)

    if(error){
      this.toast.showShortBottom("error al obtener actividades").subscribe( x=> {});
    }

    if(!error){
      this.actividades = data
    }
  }

  isActividadesEmpty(): boolean{

    if (this.actividades == null){
      return true;
    }

    if (this.actividades.length > 0 ){
      return false;
    }else{
      return true;
    }
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

  updateIndicatorPosition($event, willchange) {
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
