import { Component, OnInit } from '@angular/core';
import { ServersAndDevicesPrice } from 'app/Models/ServersAndDevicesPrice.model';
import { ServersAndDevicesPriceService } from 'app/Services/servers-and-devices-price.service';
import { ServerType } from 'app/Models/ServersAndDevicesPrice.model';
import { CapacitiesService } from 'app/Services/capacities.service';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
@Component({
  selector: 'app-HardwarePrice',
  templateUrl: './HardwarePrice.component.html',
  styleUrls: ['./HardwarePrice.component.css']
})
export class HardwarePriceComponent implements OnInit {
servers:any;
devices:any;
computesCapa:any;
storagesCapa:any;
devicesCapa:any;
controlnetsCapa:any;
news=new ServersAndDevicesPrice()
newd=new ServersAndDevicesPrice()
updateP=new ServersAndDevicesPrice()
id:any;
admin:any;

  constructor(private ServersAndDevicesPriceService:ServersAndDevicesPriceService, private CapacitiesService:CapacitiesService , private router:Router, private kc: KeycloakService) { }

  ngOnInit() {
    
    this.admin= this.kc.isUserInRole("admin")
     
    this.getPrices()
    this.getComputesCapa()
    this.getStoragesCapa()
    this.getControlNetworkss()
    this.getDevicesCapa()
    
  }
  onSelectS(event: Event) {
    
    this.news.name = (event.target as HTMLSelectElement).value;
  }
  onSelectD(event: Event) {
    
    this.newd.name = (event.target as HTMLSelectElement).value;
  }

  
  getComputesCapa(){
    this.CapacitiesService.getComputesCapa().subscribe(res => {
        this.computesCapa=res;
        console.log(this.computesCapa)
      }
    ); 
  }
  getStoragesCapa(){
    this.CapacitiesService.getStorages().subscribe(res => {
        this.storagesCapa=res;
      }
    ); 
  }
  getControlNetworkss(){
    this.CapacitiesService.getControlNetworks().subscribe(res => {
        this.controlnetsCapa=res;
      }
    ); 
  }
  getDevicesCapa(){
    this.CapacitiesService.getDevicesCapa().subscribe(res => {
        this.devicesCapa=res;
      }
    ); 
  }
  getPrices(){
    
    
    this.ServersAndDevicesPriceService.getPrices('SERVER').subscribe(res => {
        this.servers=res
      });
      this.ServersAndDevicesPriceService.getPrices('DEVICE').subscribe(res => {
        this.devices=res
      });
      
  }
  addServer() {
    this.news.type = ServerType.Server;
    this.ServersAndDevicesPriceService.addServer(this.news).subscribe(response => {
        console.log(response);
         
    }, error => {
        console.error('Error:', error);
        window.location.reload();
    });
}
    addDevice(){
      this.newd.type=ServerType.Device;
      this.ServersAndDevicesPriceService.addServer(this.newd).subscribe()
        window.location.reload()
      }


      getid(c:any){
        this.id=c;
      }
      deleteP(id:any){
        this.ServersAndDevicesPriceService.deleteP(id).subscribe()
        
        window.location.reload()
      }
      getupdateP(u:any){
        this.updateP=u;
      }
      updatep(id:any){
        this.ServersAndDevicesPriceService.updateP(this.updateP,id).subscribe()
        window.location.reload();
      }

}
