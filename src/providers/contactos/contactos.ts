import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ContactosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactosProvider {

  host = "https://nica-v.herokuapp.com/nv-api/contactos";
  proxy = 'https://cors-anywhere.herokuapp.com/';

  constructor(public http: HttpClient) {
    console.log('Hello ContactosProvider Provider');
  }

  async getContacto(idreserva: string) {

    try{
      let response = fetch(this.proxy+this.host+`?idreserva=${idreserva}`, {
        headers: {"Auth": "nv/@pi~kronno"} 
      })

      let json = await (await response).json()
      
      if (json.error == null && json.mensaje == null){
        return {
          data: json,
          error: false
        }
      }else{
        return {
          data: [],
          error: true
        }
      }
    }catch(error){
      console.error(error)
      return {
        data: [],
        error: true
      }
    }
  }

}
