import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LugaresDescripcionPage } from '../lugares-descripcion/lugares-descripcion';
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

  lugares = [
    {
      img: "assets/imgs/Masaya.jpg",
      titulo: "Volcan Masaya",
      descripcion: "Lorem Ipsum is simply dummy text of the printing",
      descripcion2 : "Esse aliquip dolore est non consectetur esse duis sunt Lorem adipisicing. Minim voluptate fugiat occaecat esse nisi quis culpa et. Culpa ad laboris pariatur esse commodo elit labore. Ad ipsum excepteur occaecat ullamco et do ut occaecat do incididunt duis dolor.",
      ubicacion: {lat : "0.0" , long : "0.0"},
      urlImgs: ''
    },
    {
      img: "assets/imgs/cañon-somoto.jpg",
      titulo: "Cañon de Somoto",
      descripcion: "Lorem Ipsum is simply dummy text of the printing",
      descripcion2 : "Esse aliquip dolore est non consectetur esse duis sunt Lorem adipisicing. Minim voluptate fugiat occaecat esse nisi quis culpa et. Culpa ad laboris pariatur esse commodo elit labore. Ad ipsum excepteur occaecat ullamco et do ut occaecat do incididunt duis dolor.",
      ubicacion: {lat : "0.0" , long : "0.0"},
      urlImgs: ''
    },
    {
      img: "assets/imgs/Monbacho.jpg",
      titulo: "Volcan Mombacho",
      descripcion: "Lorem Ipsum is simply dummy text of the printing",
      descripcion2 : "Esse aliquip dolore est non consectetur esse duis sunt Lorem adipisicing. Minim voluptate fugiat occaecat esse nisi quis culpa et. Culpa ad laboris pariatur esse commodo elit labore. Ad ipsum excepteur occaecat ullamco et do ut occaecat do incididunt duis dolor.",
      ubicacion: {lat : "0.0" , long : "0.0"},
      urlImgs: ''
    }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LugaresPage');
  }

  bgImage(lugar){
    return "url('" + lugar.img + "')";
  }

  irLugarDesc(lugar){
    setTimeout(()=> {
      this.navCtrl.push(LugaresDescripcionPage, { lugar: lugar });
    },50);
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
