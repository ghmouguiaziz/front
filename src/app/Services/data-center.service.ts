import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataCenter } from 'app/Models/DataCenter.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataCenterService {
  Gestion_Des_Zone_URL = 'http://localhost:8090/data';
sharedData:String;
sharedIdData:any;
  constructor(private http : HttpClient) { }

  public getDataCenters(name:String): Observable <DataCenter> {
     return this.http.get<DataCenter> (`${this.Gestion_Des_Zone_URL}/getAllDataCenterByAffiliate/`+ name)
  }
}
