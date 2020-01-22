import { Component } from '@angular/core';
import { 
  IonicPage, NavController, 
  AlertController,LoadingController} 
from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

// import providers
import { ReservasProvider  } from '../../providers/reservas/reservas';
import { DepartamentosProvider } from '../../providers/departamentos/departamentos';


//native components
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the LugaresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lugares',
  templateUrl: 'lugares.html',
})

export class LugaresPage {


  reservas: Array<any>;
  reservasTemp: Array<any>
  departamentos: Array<any>
  error: boolean = false;

  constructor(private navCtrl: NavController, private loadCtrl: LoadingController, 
    private toast: Toast, private photoViewer: PhotoViewer, private alert: AlertController,
    private deptP: DepartamentosProvider, private reservaP: ReservasProvider) {
  }

  async ionViewDidLoad (){
    
    let navigator = window.navigator;

    if (!navigator.onLine){
      this.error = true;
    }

    if (navigator.onLine){

      let load = this.loadCtrl.create({
        content: "Retrayendo información"
      })
      load.present()
      
      await this.getDepts()
      await this.getReservas()
      load.dismiss()

    }
  }

  async getReservas(){
    let {data, error} = await this.reservaP.getReservas()

    if (error){
      this.error = true
    }

    if (!error){
      this.error = false
      this.reservas = data
      this.reservasTemp = data
    }
  }

  async getDepts(){
    let {data, error} = await this.deptP.getDepts()
    if(!error){
      this.departamentos = data
    }
  }

  setheight(){
    return `${document.querySelector("[col-4]").clientWidth}px`
  }

  filter(){

    if (this.departamentos == null){
      this.toast.showShortBottom('Error, no se puede buscar por departamento').subscribe( x=> {});
      return;
    }

    let alertF = this.alert.create();
    alertF.setTitle('Busqueda por departamento');
    
    this.departamentos.forEach(dept =>{ 
      //adding inputs
      alertF.addInput({
        type: 'radio',
        label: dept.nombre,
        value: dept.id,
        checked: false  
      });
    });

    alertF.addButton('Cancel');
    alertF.addButton({
      text: 'OK',
      handler: value => {
        this.reservas = this.reservasTemp.filter( reserva => reserva.idDept == value );
      }
    });
    alertF.present();
  }

  isEmpty(){
    if(this.reservas != null)
      if(this.reservas.length < 1){
        return true
      }

    return false
  }

  getImage(reserva){
    if(reserva.imagenFondo.substring(0,5) != "https"){
      return `https://nica-v.herokuapp.com/multimedia/${reserva.imagenFondo}`
    }else{
      return reserva.imagenFondo
    }
  }
  
  async tryFetch(){
    let load = this.loadCtrl.create({
      content: "Retrayendo información"
    })
    load.present()
    await this.getDepts()
    await this.getReservas()
    load.dismiss()
  }

  irLugarDesc(reserva){
    this.navCtrl.push('LugaresDescripcionPage', { reserva: reserva });
  }

  openImage(img){
    this.photoViewer.show(img)
  }
}
