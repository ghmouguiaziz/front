import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resources } from 'app/Models/CurrentApps.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentAppsService {

  Gestion_Des_App_URL = 'http://localhost:8092/data';

  constructor(private http : HttpClient) { }

  public getCurrentApps( t:any,id:any,a:any): Observable <Resources> {
    return this.http.get<Resources> (`${this.Gestion_Des_App_URL}/findByType/`+t+`/`+ id+`/`+a)
 }
 addApp(c:any , id:any){
  return this.http.post(`${this.Gestion_Des_App_URL}/addResources/`+id , c) ;
}

deleteApp(id: any){
  return this.http.delete(`${this.Gestion_Des_App_URL}/deleteResources/`+id) ;
  }
  updateApp( u:any,id:any){
    return this.http.put(`${this.Gestion_Des_App_URL}/updateResources/`+id,u) ;
  }
}
