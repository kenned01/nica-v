import { Component } from '@angular/core';
import { 
  IonicPage, NavController, 
  NavParams, AlertController,
  ToastController  } 
from 'ionic-angular';
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

/* interface Reserva {
  id: number;
  idDept: number;
  nombre: String;
  descripccion: String;
  imagenFondo: String;
  coordenadas: String;
  sipnosis: String;

} */

export class LugaresPage {


  reservas: Array<any>;
  height: String;
  error: any = null;
  reservasTemp: Array<any>
  departamentos: Array<any>

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public reservaP: ReservasProvider, public alert: AlertController,
    public toastCtrl: ToastController, public deptP: DepartamentosProvider) {
  }

  async ionViewDidLoad (){
    let reservasData = await this.reservaP.getReservas()
    if (reservasData.error != null || reservasData.mensaje != null){
      this.error = true
    }else{
      this.reservas = reservasData
      this.reservasTemp = reservasData
    }

    let deptData = await this.deptP.getDepts()
    if (deptData.error == null && deptData.mensaje == null){
      this.departamentos = deptData
    }

  }

  setheight(){
    return `${document.querySelector("[col-4]").clientWidth}px`;
  }

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
    this.navCtrl.push(LugaresDescripcionPage, { lugar: reserva });
  }

  /*seeMore() {

    console.log('ver mas activo')
    try {
        let diferencia = this.Plength - this.cantidadBoton;
        console.log(diferencia);
        if(diferencia <= 10 && diferencia > 0){
          this.prueba = this.pruebaT;
          this.cantidadBoton = this.Plength;
        }else if(diferencia > 10){
  
          let contador = 0;
          while(contador < 10){
            this.prueba.push(this.pruebaT[this.cantidadBoton]);
            this.cantidadBoton++;
            contador++;
          }
        }else{
          console.log('ya se mostro todo');
        }
    } catch (error) {
      console.log(error);
    }
    
  }*/
}
