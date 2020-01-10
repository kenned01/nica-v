import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ReservasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReservasProvider {

  host = "https://nica-v.herokuapp.com/nv-api/reservas";
  proxy = 'https://cors-anywhere.herokuapp.com/';

  constructor(public http: HttpClient) {
  }

  async getReservas() {

    try{
      let response = fetch(this.proxy+this.host, {
        headers: {"Auth": "nv/@pi~kronno"} 
      })

      let json = await (await response).json()
      
      return json
    }catch(error){
      console.error(error)
    }
  }
  
}
