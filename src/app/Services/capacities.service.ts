import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComputeCapacities } from 'app/Models/ComputeCapacities.model';
import { StorageCapacities } from 'app/Models/StorageCapacities.model';
import { NetworkElementsCapacities } from 'app/Models/NetworkElementsCapacities.model';
@Injectable({
  providedIn: 'root'
})
export class CapacitiesService {

  Serveurs_URL = 'http://localhost:8093/data';

  constructor(private http: HttpClient) { }
  public getComputesCapa(): Observable <ComputeCapacities> {
    return this.http.get<ComputeCapacities> (`${this.Serveurs_URL}/getAllComputeCapacities`);
}
getComputeCapa(name:any) {
  return this.http.get(`${this.Serveurs_URL}/findByClassOfCompute/`+name);
}
getStorageCapa(name:any) {
  return this.http.get(`${this.Serveurs_URL}/findByClassOfStorage/`+name);
}
addCompute(c:any){
  return this.http.post(`${this.Serveurs_URL}/addComputeCapacities`, c) ;
}

DeleteCompute(id: any){
  return this.http.delete(`${this.Serveurs_URL}/deleteComputeCapacities/`+id) ;
}
public getStorages(): Observable <StorageCapacities> {
  return this.http.get<StorageCapacities> (`${this.Serveurs_URL}/getAllStorageCapacities`);
}
addStorage(s:any){
return this.http.post(`${this.Serveurs_URL}/addStorageCapacities`, s) ;
}

deleteStorage(id: any){
return this.http.delete(`${this.Serveurs_URL}/deleteStorageCapacities/`+id) ;
}

public getControlNetworks(): Observable <StorageCapacities> {
  return this.http.get<StorageCapacities> (`${this.Serveurs_URL}/getAllControlNetworkCapacities`);
}
getcontrolCapa(name:any) {
  return this.http.get(`${this.Serveurs_URL}/findByClassOfControlNetwork/`+name);
}
addControlNetwork(s:any){
return this.http.post(`${this.Serveurs_URL}/addControlNetworkCapacities`, s) ;
}

deleteControlNetwork(id: any){
return this.http.delete(`${this.Serveurs_URL}/deleteControlNetworkCapacities/`+id) ;
}
updateCompute( u:any,id:any){
  return this.http.put(`${this.Serveurs_URL}/updateComputeCapacities/`+id,u) ;
}
updateStorage( u:any,id:any){
  return this.http.put(`${this.Serveurs_URL}/updateStorageCapacities/`+id,u) ;
}
updateControlNetwork( u:any,id:any){
  return this.http.put(`${this.Serveurs_URL}/updateControlNetworkCapacities/`+id,u) ;
}
getDevicesCapa(): Observable <NetworkElementsCapacities> {
  return this.http.get<NetworkElementsCapacities> (`${this.Serveurs_URL}/getAllNetworkElementsCapacities`);
}
getDeviceCapa(name:any) {
  return this.http.get(`${this.Serveurs_URL}/findByDeviceName/`+name);
}
deleteDevice(id: any){
  return this.http.delete(`${this.Serveurs_URL}/deleteNetworkElementsCapacities/`+id) ;
  }
  updateDevice( u:any,id:any){
    return this.http.put(`${this.Serveurs_URL}/updateNetworkElementsCapacities/`+id,u) ;
  }
  addDevice(s:any){
    return this.http.post(`${this.Serveurs_URL}/addNetworkElementsCapacities`, s) ;
    }

}
