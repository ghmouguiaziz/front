import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LicensesPur } from 'app/Models/LicensesPur.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurshaseHistoryService {

  constructor(private http:HttpClient) { }

  public getLicenses(id:any): Observable <LicensesPur> {
    return this.http.get<LicensesPur> ("http://localhost:8090/data/findLicensesPurByDataCenter/"+id)
 }
 addLicense(c:any , id:any){
  return this.http.post('http://localhost:8090/data/addLicensesPur/'+id , c) ;
}


}
