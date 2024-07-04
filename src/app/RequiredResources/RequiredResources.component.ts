import { Component, OnInit } from '@angular/core';
import { EnvCompute } from 'app/Models/EnvCompute.model';
import { EnvControlNetwork } from 'app/Models/EnvControlNetwork.model';
import { EnvStorage } from 'app/Models/EnvStorage.Model';
import { RessService } from 'app/Services/ress.service';
import { Availablity } from 'app/Models/EnvCompute.model';
import { Champ } from 'app/Models/EnvCompute.model';
import { NetworkElements } from 'app/Models/NetworkElements.model';
import { CapacitiesService } from 'app/Services/capacities.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-RequiredResources',
  templateUrl: './RequiredResources.component.html',
  styleUrls: ['./RequiredResources.component.css']
})
export class RequiredResourcesComponent implements OnInit {

  idD:any;
  data:any; 
  ch:any; 
  
  networkelements:any;
  computesfps:any;
  storagesfps:any;
  controlNetworksfps:any;
  controlNetworkqty:any;
  computesqty:any;
  storageqty:any;
  totqty:any;
  bcc:any;
  bcr:any;
  icc:any;
  icr:any;
  lpc:any;
  lpr:any;
  inc:any;
  inr:any;
  capa:any;
  perf:any;
  gcapa:any;
  gperf:any;
  
  totsfps:any;
  computes:any;
  computesCapa:any;
  computeCapa:any;
  devicesCapa:any;
  deviceCapa:any;
  storagesCapa:any;
  storageCapa:any;
  controlnetsCapa:any;
  controlnetCapa:any;
  storages:any;
  controlnetworks:any;
  
  newcompute=new EnvCompute();
  newstorage=new EnvStorage();
  newcontrolnetwork=new EnvControlNetwork();
  newdevice= new NetworkElements() ;
  id:any;
  updatecompute=new EnvCompute();
  updatestorage=new EnvStorage();
  updatecontrolnetwork=new EnvControlNetwork();
  updatedevice= new NetworkElements() ;
  
  
  firewalls:any=0;
  totports:any=0;
  totdevices:any=0;
  used:any=0;
  free:any;

  exfree:any;
  
  
  controlQty:any=0;
  capacities:any;
  
  
  
    constructor(private RessService:RessService, private CapacitiesService: CapacitiesService) {}
    
    ngOnInit() {
      
    
    this.idD =localStorage.getItem('idD')
    this.data =localStorage.getItem('data')
    this.exfree =localStorage.getItem('free')
    
    /*this.getComputes(this.idD);
    this.getStorages(this.idD);
    this.getControlNetworks(this.idD);
    this.getNetworkElements(this.idD);
  this.getComputesCapa();
  this.getStoragesCapa();
  this.getControlNetworkss();
  this.getDevicesCapa();
*/
  forkJoin([
    this.RessService.getComputes( 'REQUIRED',this.idD),
    this.RessService.getStorages( 'REQUIRED',this.idD),
    this.RessService.getControlNetworks( 'REQUIRED',this.idD),
    this.RessService.getNetworkElements( 'REQUIRED',this.idD),
    this.CapacitiesService.getComputesCapa(),
    this.CapacitiesService.getStorages(),
    this.CapacitiesService.getControlNetworks(),
    this.CapacitiesService.getDevicesCapa()

]).subscribe(([computesRes, storagesRes, controlnetworksRes,networkelementsRes,computesCapaRes,storagesCapaRes,controlnetsCapaRes,devicesCapaRes]) => {
    this.computes = computesRes;
    this.storages = storagesRes;
    this.controlnetworks = controlnetworksRes;
    this.networkelements = networkelementsRes;
    this.computesCapa = computesCapaRes;
    this.storagesCapa = storagesCapaRes;
    this.controlnetsCapa = controlnetsCapaRes;
    this.devicesCapa = devicesCapaRes;
    // Autres traitements après la réception de toutes les données
    this.getValues();
    this.calculatePorts();


});
  
  
  
  
  
  
    
    
    
  }


  getValues(){
        this.computesfps=this.calculateTotalSfps(this.computes)
        this.computesqty=this.calculateTotalQty(this.computes)
        this.bcc=this.calculateTotalbcc(this.computes)
        this.bcr=this.calculateTotalbcr(this.computes)
        this.icc=this.calculateTotalicc(this.computes)
        this.icr=this.calculateTotalicr(this.computes)
        this.inc=this.calculateTotalinc(this.computes)
        this.inr=this.calculateTotalinr(this.computes)
        this.lpr=this.calculateTotallpr(this.computes)
        this.lpc=this.calculateTotallpc(this.computes)

        this.storagesfps=this.calculateTotalSfps(this.storages)
          this.storageqty=this.calculateTotalQty(this.storages)
          this.perf=this.calculateTotalnetvperf(this.storages)
          this.capa=this.calculateTotalnetvcapa(this.storages)
          localStorage.setItem('perf',this.perf)
          localStorage.setItem('capa',this.capa)
          this.gperf=this.calculateTotalgvperf(this.storages)
          this.gcapa=this.calculateTotalgvcapa(this.storages)

          this.controlNetworksfps=this.calculateTotalSfps(this.controlnetworks)
            this.controlNetworkqty=this.calculateTotalQty(this.controlnetworks)
            this.totsfps=this.storagesfps+this.computesfps+this.controlNetworksfps
            this.totqty=this.storageqty+this.computesqty+this.controlNetworkqty
  
            this.controlnetworks.forEach(e => {
              if (e.classOfControlNetwork=="Control node")
              this.controlQty=this.controlQty+e.qty
            });
  
            this.capacities=this.totqty-this.controlQty
            localStorage.setItem("capaNodeA",this.capacities)

            
  }
  getComputesCapa(){
    this.CapacitiesService.getComputesCapa().subscribe(res => {
        this.computesCapa=res;
      }
    ); 
  }
  getStoragesCapa(){
    this.CapacitiesService.getStorages().subscribe(res => {
        this.storagesCapa=res;
      }
    ); 
  }
  getDevicesCapa(){
    this.CapacitiesService.getDevicesCapa().subscribe(res => {
        this.devicesCapa=res;
      }
    ); 
  }
  
  getComputes(id:any){
    
    
    this.RessService.getComputes( 'REQUIRED',id).subscribe(res => {
        this.computes=res
        this.computesfps=this.calculateTotalSfps(this.computes)
        this.computesqty=this.calculateTotalQty(this.computes)
        this.bcc=this.calculateTotalbcc(this.computes)
        this.bcr=this.calculateTotalbcr(this.computes)
        this.icc=this.calculateTotalicc(this.computes)
        this.icr=this.calculateTotalicr(this.computes)
        this.inc=this.calculateTotalinc(this.computes)
        this.inr=this.calculateTotalinr(this.computes)
        this.lpr=this.calculateTotallpr(this.computes)
        this.lpc=this.calculateTotallpc(this.computes)
          
        console.log(this.computesfps)
      }
    );
    
    
  }
  onSelectcompute(event: Event) {
      
    this.newcompute.classOfCompute = (event.target as HTMLSelectElement).value;
   
    
  }
  onSelectchamp(event: Event) {
      
    this.ch = (event.target as HTMLSelectElement).value;
    if(this.ch=="Extension"){this.newcompute.champ=Champ.Extension}
    if(this.ch=="Initial"){this.newcompute.champ=Champ.Initial}
   
  }
  onSelectchampS(event: Event) {
      
    this.ch = (event.target as HTMLSelectElement).value;
    if(this.ch=="Extension"){this.newstorage.champ=Champ.Extension}
    if(this.ch=="Initial"){this.newstorage.champ=Champ.Initial}
   
  }
  onSelectchampC(event: Event) {
      
    this.ch = (event.target as HTMLSelectElement).value;
    if(this.ch=="Extension"){this.newcontrolnetwork.champ=Champ.Extension}
    if(this.ch=="Initial"){this.newcontrolnetwork.champ=Champ.Initial}
   
  }
  onSelectchampD(event: Event) {
      
    this.ch = (event.target as HTMLSelectElement).value;
    if(this.ch=="Extension"){this.newdevice.champ=Champ.Extension}
    if(this.ch=="Initial"){this.newdevice.champ=Champ.Initial}
   
  }
  addComputeAva(id:any){
  
    this.newcompute.availablity=Availablity.Required;
    this.CapacitiesService.getComputeCapa(this.newcompute.classOfCompute).subscribe(res => {
      this.computeCapa=res;
      this.newcompute.sfps=this.computeCapa.sfps*this.newcompute.qty
      if(this.computeCapa.classOfCompute=="Basic Compute"){
        this.newcompute.bcvcpu=this.computeCapa.maxvcpu*this.newcompute.qty
        this.newcompute.bcvram=this.computeCapa.maxvram*this.newcompute.qty
      }
      if(this.computeCapa.classOfCompute=="Intensive Compute"){
        this.newcompute.icvcpu=this.computeCapa.maxvcpu*this.newcompute.qty
        this.newcompute.icvram=this.computeCapa.maxvram*this.newcompute.qty
      }
      if(this.computeCapa.classOfCompute=="Basic Compute LocalPaaS"){
        this.newcompute.bcngvcpu=this.computeCapa.maxvcpu*this.newcompute.qty
        this.newcompute.bcngvram=this.computeCapa.maxvram*this.newcompute.qty
      }
      if(this.computeCapa.classOfCompute=="Network Compute"){
        this.newcompute.invcpu=this.computeCapa.maxvcpu*this.newcompute.qty
        this.newcompute.invram=this.computeCapa.maxvram*this.newcompute.qty
      }
      
  
    this.RessService.addCompute(this.newcompute, id).subscribe();
    window.location.reload()
    }
  ); 
   
    }
    
    getStorages(id:any){
    
    
      this.RessService.getStorages( 'REQUIRED',id).subscribe(res => {
          this.storages=res
          this.storagesfps=this.calculateTotalSfps(this.storages)
          this.storageqty=this.calculateTotalQty(this.storages)
          this.perf=this.calculateTotalnetvperf(this.storages)
          this.capa=this.calculateTotalnetvcapa(this.storages)
          localStorage.setItem('perf',this.perf)
          localStorage.setItem('capa',this.capa)
          this.gperf=this.calculateTotalgvperf(this.storages)
          this.gcapa=this.calculateTotalgvcapa(this.storages)
  
          console.log(this.storagesfps)
        }
      );
      
      
    }
    onSelectstorage(event: Event) {
      
      this.newstorage.classOfStorage = (event.target as HTMLSelectElement).value;
     
      
    }
    addStorageAva(id:any){
  
      this.newstorage.availablity=Availablity.Required;
      this.CapacitiesService.getStorageCapa(this.newstorage.classOfStorage).subscribe(res => {
        this.storageCapa=res;
        console.log(this.storageCapa)
        this.newstorage.sfps=this.storageCapa.sfps*this.newstorage.qty
        console.log(this.newstorage.classOfStorage)
        if(this.storageCapa.classOfStorage=="Capacity Storage"){
          this.newstorage.capaGrossVolume=this.storageCapa.volumeBrut*this.newstorage.qty
          this.newstorage.capaNetVolume=this.storageCapa.volumeNet*this.newstorage.qty
        }
        if(this.storageCapa.classOfStorage=="Performance Storage"){
          this.newstorage.perfGrossVolume=this.storageCapa.volumeBrut*this.newstorage.qty
          this.newstorage.perfNetVolume=this.storageCapa.volumeNet*this.newstorage.qty
        }
        this.RessService.addStorage(this.newstorage, id).subscribe();
        window.location.reload()
      }
    ); 
     
      }
      onSelectcontrol(event: Event) {
      
        this.newcontrolnetwork.classOfControlNetwork = (event.target as HTMLSelectElement).value;
       
        
      }
  
      getControlNetworkss(){
        this.CapacitiesService.getControlNetworks().subscribe(res => {
            this.controlnetsCapa=res;
          }
        ); 
      }
    
      getControlNetworks(id:any){
    
    
        this.RessService.getControlNetworks( 'REQUIRED',id).subscribe(res => {
            this.controlnetworks=res
            this.controlNetworksfps=this.calculateTotalSfps(this.controlnetworks)
            this.controlNetworkqty=this.calculateTotalQty(this.controlnetworks)
            this.totsfps=this.storagesfps+this.computesfps+this.controlNetworksfps
            this.totqty=this.storageqty+this.computesqty+this.controlNetworkqty
  
            this.controlnetworks.forEach(e => {
              if (e.classOfControlNetwork=="Control node")
              this.controlQty=this.controlQty+e.qty
            });
  
            this.capacities=this.totqty-this.controlQty
            localStorage.setItem("capaNodeA",this.capacities)
            console.log(this.controlNetworksfps)
            console.log(this.totsfps)
          }
        );
        
        
      }
      
        addControlNetworkAva(id:any){
  
          this.newcontrolnetwork.availablity=Availablity.Required;
          this.CapacitiesService.getcontrolCapa(this.newcontrolnetwork.classOfControlNetwork).subscribe(res => {
            this.controlnetCapa=res;
            console.log(this.controlnetCapa)
            this.newcontrolnetwork.sfps=this.controlnetCapa.sfps*this.newcontrolnetwork.qty
            
            
            this.RessService.addControlNetwork(this.newcontrolnetwork, id).subscribe();
          window.location.reload()
          }
        ); 
         
          }
          onSelectdevice(event: Event) {
      
            this.newdevice.name = (event.target as HTMLSelectElement).value;
           
            
          }
          addDevice(id:any){
  
            this.newdevice.availablity=Availablity.Required;
            this.CapacitiesService.getDeviceCapa(this.newdevice.name).subscribe(res => {
              this.deviceCapa=res;
              console.log(this.deviceCapa)
              this.newdevice.ports=this.deviceCapa.ports*this.newdevice.qty
              if(this.newdevice.name=="OOB swithchs"){
                this.newdevice.used=this.totqty+this.totdevices+this.firewalls
                this.newdevice.free=this.newdevice.ports-this.newdevice.used
              }
              else {
                this.networkelements.forEach(d=> {
                  switch(d.name){
                    case "OOB swithchs":
                      d.used=d.used+this.newdevice.qty
                      d.free=d.free-this.newdevice.qty
                      this.RessService.updateNetworkElement(d,d.idElements).subscribe()
                      break;
                      default:
                    
                    break;
                  }
                })
              }
              
              this.RessService.addNetworkElement(this.newdevice, id).subscribe();
            window.location.reload()
            }
          ); 
           
            }
  
  
            calculatePorts(){
             
              
              this.networkelements.forEach(z => {
                switch (z.name) {
                  case "Access switchs Type (48 ports)":
                    this.totdevices=this.totdevices+z.qty
                    this.totports=this.totports+z.ports
                    
                    
                    break;
                    case "Access Switchs Type (96 ports)":
                    this.totdevices=this.totdevices+z.qty
                    this.totports=this.totports+z.ports
                    
                    
                    break;
                    case "Firewalls":
                    this.firewalls=this.firewalls+z.qty
                    
                    
                    break;
                  
                  default:
                    
                    break;
                }
              });
              this.used=this.totsfps+this.firewalls*2+this.totdevices*2
              this.free=this.totports-this.used
              
            
            }
  
          calculateTotalSfps(items: any[]): number {
            return items.reduce((total, item) => total + item.sfps, 0);
          }
          calculateTotalQty(items: any[]): number {
            return items.reduce((total, item) => total + item.qty, 0);
          }
          calculateTotalbcc(items: any[]): number {
            return items.reduce((total, item) => total + item.bcvcpu, 0);
          }
          calculateTotalbcr(items: any[]): number {
            return items.reduce((total, item) => total + item.bcvram, 0);
          }
          calculateTotalicr(items: any[]): number {
            return items.reduce((total, item) => total + item.icvram, 0);
          }
          calculateTotalicc(items: any[]): number {
            return items.reduce((total, item) => total + item.icvcpu, 0);
          }
          calculateTotalinc(items: any[]): number {
            return items.reduce((total, item) => total + item.invcpu, 0);
          }
          calculateTotalinr(items: any[]): number {
            return items.reduce((total, item) => total + item.invram, 0);
          }
          calculateTotallpr(items: any[]): number {
            return items.reduce((total, item) => total + item.bcngvram, 0);
          }
          calculateTotallpc(items: any[]): number {
            return items.reduce((total, item) => total + item.bcngvcpu, 0);
          }
          calculateTotalnetvperf(items: any[]): number {
            return items.reduce((total, item) => total + item.perfNetVolume, 0);
          }
          calculateTotalnetvcapa(items: any[]): number {
            return items.reduce((total, item) => total + item.capaNetVolume, 0);
          }
          calculateTotalgvperf(items: any[]): number {
            return items.reduce((total, item) => total + item.perfGrossVolume, 0);
          }
          calculateTotalgvcapa(items: any[]): number {
            return items.reduce((total, item) => total + item.capaGrossVolume, 0);
          }
          
  
  
          
  
          
          getNetworkElements(id:any){
    
    
            this.RessService.getNetworkElements( 'REQUIRED',id).subscribe(res => {
                this.networkelements=res
                this.calculatePorts();
                
              }
            );
            
            
          }
          
  
          getid(c:any){
            this.id=c;
          }
  
  
  
          deleteDevice(id:any){
            this.RessService.deleteDevice(id).subscribe()
            
            window.location.reload()
          }
          getupdateDevice(u:any){
  
            this.updatedevice=u;
          }
          updateDevice(id:any){
            this.CapacitiesService.getDeviceCapa(this.updatedevice.name).subscribe(res => {
              this.deviceCapa=res;
              console.log(this.deviceCapa)
              this.updatedevice.ports=this.deviceCapa.ports*this.updatedevice.qty
              if(this.updatedevice.name=="OOB swithchs"){
                this.updatedevice.used=this.totqty+this.totdevices+this.firewalls
                this.updatedevice.free=this.updatedevice.ports-this.updatedevice.used
              }
              else {
                this.networkelements.forEach(d=> {
                  switch(d.name){
                    case "OOB swithchs":
                      d.used=d.used+this.updatedevice.qty
                      d.free=d.free-this.updatedevice.qty
                      this.RessService.updateNetworkElement(d,d.idElements).subscribe()
                      break;
                      default:
                    
                    break;
                  }
                })
              }
              
              this.RessService.updateNetworkElement(this.updatedevice,id).subscribe(resp => {this.getNetworkElements(this.idD);
              })
              window.location.reload();
            }
          ); 
  
  
  
  
            
          }
  
          deleteCompute(id:any){
            this.RessService.deleteCompute(id).subscribe()
            
            window.location.reload()
          }
          getupdateCompute(u:any){
            this.updatecompute=u;
          }
          updateCompute(id:any){
            this.CapacitiesService.getComputeCapa(this.updatecompute.classOfCompute).subscribe(res => {
              this.computeCapa=res;
              console.log(this.computeCapa)
              this.updatecompute.sfps=this.computeCapa.sfps*this.updatecompute.qty
              if(this.computeCapa.classOfCompute=="Basic Compute"){
                this.updatecompute.bcvcpu=this.computeCapa.maxvcpu*this.updatecompute.qty
                this.updatecompute.bcvram=this.computeCapa.maxvram*this.updatecompute.qty
              }
              if(this.computeCapa.classOfCompute=="Intensive Compute"){
                this.updatecompute.icvcpu=this.computeCapa.maxvcpu*this.updatecompute.qty
                this.updatecompute.icvram=this.computeCapa.maxvram*this.updatecompute.qty
              }
              if(this.computeCapa.classOfCompute=="Basic Compute LocalPaaS"){
                this.updatecompute.bcngvcpu=this.computeCapa.maxvcpu*this.updatecompute.qty
                this.updatecompute.bcngvram=this.computeCapa.maxvram*this.updatecompute.qty
              }
              if(this.computeCapa.classOfCompute=="Network Compute"){
                this.updatecompute.invcpu=this.computeCapa.maxvcpu*this.updatecompute.qty
                this.updatecompute.invram=this.computeCapa.maxvram*this.updatecompute.qty
              }
              
          
              this.RessService.updateCompute(this.updatecompute,id).subscribe(resp => {this.getComputes(this.idD);
              })
              window.location.reload();
            }
          ); 
  
  
            
            
          }
  
  
          deleteStorage(id:any){
            this.RessService.deleteStorage(id).subscribe()
            
            window.location.reload()
          }
          getupdateStorage(u:any){
            this.updatestorage=u;
          }
          updateStorage(id:any){
  
            this.CapacitiesService.getStorageCapa(this.updatestorage.classOfStorage).subscribe(res => {
              this.storageCapa=res;
              console.log(this.storageCapa)
              this.updatestorage.sfps=this.storageCapa.sfps*this.updatestorage.qty
              console.log(this.updatestorage.classOfStorage)
              if(this.storageCapa.classOfStorage=="Capacity Storage"){
                this.updatestorage.capaGrossVolume=this.storageCapa.volumeBrut*this.updatestorage.qty
                this.updatestorage.capaNetVolume=this.storageCapa.volumeNet*this.updatestorage.qty
              }
              if(this.storageCapa.classOfStorage=="Performance Storage"){
                this.updatestorage.perfGrossVolume=this.storageCapa.volumeBrut*this.updatestorage.qty
                this.updatestorage.perfNetVolume=this.storageCapa.volumeNet*this.updatestorage.qty
              }
              this.RessService.updateStorage(this.updatestorage,id).subscribe(resp => {this.getStorages(this.idD);
              })
              window.location.reload();
            }
          ); 
  
  
  
  
            
          }
  
  
  
  
          deleteCN(id:any){
            this.RessService.deleteCN(id).subscribe()
            
            window.location.reload()
          }
          getupdateCN(u:any){
            this.updatecontrolnetwork=u;
          }
          updateCN(id:any){
            this.CapacitiesService.getcontrolCapa(this.updatecontrolnetwork.classOfControlNetwork).subscribe(res => {
              this.controlnetCapa=res;
              console.log(this.controlnetCapa)
              this.updatecontrolnetwork.sfps=this.controlnetCapa.sfps*this.updatecontrolnetwork.qty
              
              
              this.RessService.updateCN(this.updatecontrolnetwork,id).subscribe(resp => {this.getControlNetworks(this.idD);
              })
              window.location.reload();
            }
          ); 
  
  
  
            
          }
      
  
  }
  
  
  