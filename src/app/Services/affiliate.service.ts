import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Affiliate } from 'app/Models/Affiliate.model';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AffiliateService {
   Gestion_Des_Zone_URL = 'http://localhost:8090/data';

  constructor(private http : HttpClient) { }

  public getAffiliates(name:String): Observable <Affiliate> {
     return this.http.get<Affiliate> (`${this.Gestion_Des_Zone_URL}/getAllAffiliateByZone/`+ name)
  }

  
  }
