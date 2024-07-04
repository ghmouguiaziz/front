import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Zone } from 'app/Models/Zone.model';
@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  Zones_URL = 'http://localhost:8090/data';
  constructor(private http : HttpClient) { }

  public getZones(): Observable <Zone> {
    return this.http.get<Zone> (`${this.Zones_URL}`+`/getAllZone`);
  }
  addZone(c:any){
    return this.http.post(`${this.Zones_URL}`+`/addZone`, c) ;
  }
  
  deleteZone(id: any){
    return this.http.delete(`${this.Zones_URL}`+`/deleteZone/`+id) ;
  }
  addAffiliate(c:any , idZ:any){
    return this.http.post(`${this.Zones_URL}`+`/addAffiliate/`+idZ , c) ;
  }
  
  deleteAffiliate(id: any){
    return this.http.delete(`${this.Zones_URL}`+`/deleteAffiliate/`+id) ;
  }
  addDataCenter(c:any , idA:any){
    return this.http.post(`${this.Zones_URL}`+`/addDataCenter/`+idA , c) ;
  }
  
  deleteDataCenter(id: any){
    return this.http.delete(`${this.Zones_URL}`+`/deleteDataCenter/`+id) ;
  }
  updateZone(z:any ,id:any){
    return this.http.put(`${this.Zones_URL}`+`/updateZone/`+id,z) ;
  }
  updateAffiliate(z:any ,id: any){
    return this.http.put(`${this.Zones_URL}`+`/updateAffiliate/`+id,z) ;
  }
  updateDataCenter(z:any ,id: any){
    return this.http.put(`${this.Zones_URL}`+`/updateDataCenter/`+id,z) ;
  }




}


