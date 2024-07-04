import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvCompute } from 'app/Models/EnvCompute.model';
import { EnvControlNetwork } from 'app/Models/EnvControlNetwork.model';
import { EnvStorage } from 'app/Models/EnvStorage.Model';
import { NetworkElements } from 'app/Models/NetworkElements.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RessService {
  Gestion_Des_Ressources_URL = 'http://localhost:8091/data';
  Prix_URL = 'http://localhost:8094/data';

  constructor(private http : HttpClient) { }

  public getComputes(t:any,name:String): Observable <EnvCompute> {
    return this.http.get<EnvCompute> (`${this.Gestion_Des_Ressources_URL}/findByAvailablity/`+t+`/`+name)
 }
 addCompute(c:any , id:any){
  return this.http.post(`${this.Gestion_Des_Ressources_URL}/addEnvCompute/`+id , c) ;
}
getStorages(t:any,name:String): Observable <EnvStorage> {
  return this.http.get<EnvStorage> (`${this.Gestion_Des_Ressources_URL}/findByAvailablityStorage/`+t+`/`+name)
}
addStorage(c:any , id:any){
return this.http.post(`${this.Gestion_Des_Ressources_URL}/addEnvStorage/`+id , c) ;
}
getControlNetworks(t:any,name:String): Observable <EnvControlNetwork> {
  return this.http.get<EnvControlNetwork> (`${this.Gestion_Des_Ressources_URL}/findByAvailablityControlNetwork/`+t+`/`+name)
}
addControlNetwork(c:any , id:any){
return this.http.post(`${this.Gestion_Des_Ressources_URL}/addEnvControlNetwork/`+id , c) ;
}

getNetworkElements(t:any,name:String): Observable <NetworkElements> {
  return this.http.get<NetworkElements> (`${this.Gestion_Des_Ressources_URL}/findByAvailablityElements/`+t+`/`+name)
}
addNetworkElement(c:any , id:any){
  return this.http.post(`${this.Gestion_Des_Ressources_URL}/addNetworkElements/`+id , c) ;
  }
  updateNetworkElement(c:any , id:any){
    return this.http.put(`${this.Gestion_Des_Ressources_URL}/updateNetworkElements/`+id , c) ;
    }
    deleteDevice(id: any){
      return this.http.delete(`${this.Gestion_Des_Ressources_URL}/deleteNetworkElements/`+id) ;
      }

    getPrice(name:any){
      return this.http.get (`${this.Prix_URL}/findServersAndDevicesPriceByName/`+name)
    }

    deleteCompute(id: any){
      return this.http.delete(`${this.Gestion_Des_Ressources_URL}/deleteEnvCompute/`+id) ;
      }
      updateCompute( u:any,id:any){
        return this.http.put(`${this.Gestion_Des_Ressources_URL}/updateEnvCompute/`+id,u) ;
      }

      deleteStorage(id: any){
        return this.http.delete(`${this.Gestion_Des_Ressources_URL}/deleteEnvStorage/`+id) ;
        }
        updateStorage( u:any,id:any){
          return this.http.put(`${this.Gestion_Des_Ressources_URL}/updateEnvStorage/`+id,u) ;
        }


        deleteCN(id: any){
          return this.http.delete(`${this.Gestion_Des_Ressources_URL}/deleteEnvControlNetwork/`+id) ;
          }
          updateCN( u:any,id:any){
            return this.http.put(`${this.Gestion_Des_Ressources_URL}/updateEnvControlNetwork/`+id,u) ;
          }

          


}

