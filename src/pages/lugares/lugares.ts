import { Component } from '@angular/core';
import { 
  IonicPage, NavController, 
  AlertController,LoadingController,
  ToastController   } 
from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

//paginas
import { LugaresDescripcionPage } from '../lugares-descripcion/lugares-descripcion';

// import providers
import { ReservasProvider  } from '../../providers/reservas/reservas';
import { DepartamentosProvider } from '../../providers/departamentos/departamentos';

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

  constructor(public navCtrl: NavController, public loadCtrl: LoadingController, 
    public photoViewer: PhotoViewer, public alert: AlertController,
    public toastCtrl: ToastController, public deptP: DepartamentosProvider,
    public reservaP: ReservasProvider) {
  }

  async ionViewDidLoad (){

    let load = this.loadCtrl.create({
      content: "Retrayendo información"
    })
    load.present()
    
    await this.getDepts()
    await this.getReservas()
    load.dismiss()
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

  setheight = () => `${document.querySelector("[col-4]").clientWidth}px`

  filter(){

    if (this.departamentos == null){
      
      const toast = this.toastCtrl.create({
        message: 'No se puede hacer el filtro',
        duration: 3000
      });

      toast.present();
      return;
    }

    let alertF = this.alert.create();
    alertF.setTitle('Busqueda por departamento');

    //adding inputs
    this.departamentos.forEach(dept =>{ 
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
      handler: data => {
        console.log(data)
      }
    });
    alertF.present();
  }

  irLugarDesc(reserva){
    this.navCtrl.push(LugaresDescripcionPage, { reserva: reserva });
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
  openImage(img){
    this.photoViewer.show(img)
  }
}
