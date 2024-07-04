import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LicensesPur } from 'app/Models/LicensesPur.model';
import { PurshaseHistoryService } from 'app/Services/purshase-history.service';
import { KeycloakService } from 'keycloak-angular';


declare var $: any;
@Component({
  selector: 'app-PurshasesHistory',
  templateUrl: './PurshasesHistory.component.html',
  styleUrls: ['./PurshasesHistory.component.css']
})
export class PurshasesHistoryComponent implements OnInit {
  Licenses:any;
  newlicense=new LicensesPur()
  idD:any;
  admin:any;
  constructor(private PurshaseHistoryService:PurshaseHistoryService, private kc: KeycloakService ) { }
  
  ngOnInit() {
    this.admin= this.kc.isUserInRole("admin")
    
    this.idD=localStorage.getItem('idD')
    this.getLicenses(this.idD)
  }

  getLicenses(id:any){
  
  
    this.PurshaseHistoryService.getLicenses(id).subscribe(res => {
        this.Licenses=res
      }
    );
    
    
  }
  addLicense(id:any){
    this.PurshaseHistoryService.addLicense(this.newlicense, id).subscribe();
      window.location.reload()
    }

}
