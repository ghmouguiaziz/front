import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LicensesPrice } from 'app/Models/LicensesPrice.model';
import { ServersAndDevicesPrice } from 'app/Models/ServersAndDevicesPrice.model';
import { ServicesPrice } from 'app/Models/Services.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServersAndDevicesPriceService {
  Prix_URL = 'http://localhost:8094/data';

  constructor(private http: HttpClient) { }

  public getPrices( t:any): Observable <ServersAndDevicesPrice> {
    return this.http.get<ServersAndDevicesPrice> (`${this.Prix_URL}`+`/findByTypeServer/`+t)
 }
 addServer(c:any){
  return this.http.post(`${this.Prix_URL}`+`/addServersAndDevicesPrice` , c) ;
}
addDevice(c:any){
  return this.http.post(`${this.Prix_URL}`+`/addServersAndDevicesPrice` , c) ;
}
getLPrices(): Observable <LicensesPrice> {
  return this.http.get<LicensesPrice> (`${this.Prix_URL}`+`/getAllLicensesPrice`)
}
addLicense(c:any){
return this.http.post(`${this.Prix_URL}`+`/addLicensesPrice/` , c) ;
}
getServicesPrice(p:any): Observable <ServicesPrice> {
  return this.http.get<ServicesPrice> (`${this.Prix_URL}`+`/getAllServicesPrice/`+p)
}
addService(c:any){
return this.http.post(`${this.Prix_URL}`+`/addServicesPrice` , c) ;
}

getPricesByProvider( P:any): Observable <ServersAndDevicesPrice> {
  return this.http.get<ServersAndDevicesPrice> (`${this.Prix_URL}`+`/getServicesPriceByProvider/`+P)
}

deleteP(id: any){
  return this.http.delete(`${this.Prix_URL}`+`/deleteServersAndDevicesPrice/`+id) ;
  }
  updateP( u:any,id:any){
    return this.http.put(`${this.Prix_URL}`+`/updateServersAndDevicesPrice/`+id,u) ;
  }
  deleteSP(id: any){
    return this.http.delete(`${this.Prix_URL}`+`/deleteServicesPrice/`+id) ;
    }
    updateSP( u:any,id:any){
      return this.http.put(`${this.Prix_URL}`+`/updateServicesPrice/`+id,u) ;
    }




}
