import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DepartamentosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DepartamentosProvider {

  host = "https://nica-v.herokuapp.com/nv-api/departamentos";
  proxy = 'https://cors-anywhere.herokuapp.com/';

  constructor(public http: HttpClient) {
  }

  async getDepts() {

    try{
      let response = fetch(this.proxy+this.host, {
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
