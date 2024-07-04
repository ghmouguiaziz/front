import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesPrice } from 'app/Models/Services.model';
import { Services } from 'app/Models/Services.model';


import { ServersAndDevicesPriceService } from 'app/Services/servers-and-devices-price.service';
import { KeycloakService } from 'keycloak-angular';
@Component({
  selector: 'services-price',
  templateUrl: './services-price.component.html',
  styleUrls: ['./services-price.component.scss']
})

export class ServicesPriceComponent implements OnInit {
runs:any;
upgrades:any;
builds:any;
id:any;
newrun= new ServicesPrice();
newupgrade= new ServicesPrice();
newbuild= new ServicesPrice();
updateP= new ServicesPrice();
admin:any;
  constructor(private ServersAndDevicesPriceService:ServersAndDevicesPriceService, private kc: KeycloakService) { }

  ngOnInit() {
    this.admin= this.kc.isUserInRole("admin")
    
    this.getPrices()
  }
  getPrices(){
    
    
    this.ServersAndDevicesPriceService.getServicesPrice('BUILD').subscribe(res => {
        this.builds=res
      });
      this.ServersAndDevicesPriceService.getServicesPrice('RUN').subscribe(res => {
        this.runs=res
      });
      this.ServersAndDevicesPriceService.getServicesPrice('UPGRADE').subscribe(res => {
        this.upgrades=res
      });
      
  }
  addRun(){
    this.newrun.serviceType=Services.Run;
    this.ServersAndDevicesPriceService.addService(this.newrun).subscribe(response => {
      
       
  }, error => {
      console.error('Error:', error);
      window.location.reload();
  });
}
    addBuild(){
      this.newbuild.serviceType=Services.Build;
      this.ServersAndDevicesPriceService.addService(this.newbuild).subscribe()
        window.location.reload()
      }
      addUpgrade(){
        this.newupgrade.serviceType=Services.Upgrade;
        this.ServersAndDevicesPriceService.addService(this.newupgrade).subscribe()
          window.location.reload()
        }



        getid(c:any){
          this.id=c;
        }
        deleteP(id:any){
          this.ServersAndDevicesPriceService.deleteSP(id).subscribe()
          
          window.location.reload()
        }
        getupdateP(u:any){
          this.updateP=u;
        }
        updatep(id:any){
          this.ServersAndDevicesPriceService.updateSP(this.updateP,id).subscribe()
          window.location.reload();
        }

}
