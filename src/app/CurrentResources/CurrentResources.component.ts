import { Component, OnInit } from '@angular/core';
import { EnvCompute } from 'app/Models/EnvCompute.model';
import { Availablity } from 'app/Models/EnvCompute.model';
import { Champ } from 'app/Models/EnvCompute.model';
import { RessService } from 'app/Services/ress.service';
import { EnvStorage } from 'app/Models/EnvStorage.Model';
import { EnvControlNetwork } from 'app/Models/EnvControlNetwork.model';
import { CapacitiesService } from 'app/Services/capacities.service';
import { NetworkElements } from 'app/Models/NetworkElements.model';
import { CurrentAppsService } from 'app/Services/current-apps.service';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-CurrentResources',
  templateUrl: './CurrentResources.component.html',
  styleUrls: ['./CurrentResources.component.css']
})
export class CurrentResourcesComponent implements OnInit {


idD:any=localStorage.getItem('idD');
data:any=localStorage.getItem('data'); 
ch:any;

networkelements:any;
computesfps:any=0;
storagesfps:any=0;
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

totsfps:any=0;
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
used: number = 0;
free: number = 0;


controlQty:any=0;
capacities:any;

//RoadMapNeeds
        oiaas:any;
        incpu:any;
        inram:any;
        icram:any;
        iccpu:any;
        bccpu:any;
        bcram:any;
        perfoiaas:any;
        capaoiaas:any;
        paas:any;
        resspaas:any;
        lpcpu:any;
        lpram:any;
        perfapps:any;
        capaapps:any;

        ram:any;
        cpu:any;
        workersNb:any;
        workersNbExact:any;
        workersCpu:any;
        workersRam:any;
        workersPerfStorage:any;
        workersCapaStorage:any;
        capaa:any;
        perfa:any;
        infracapa:any;
        infraperf:any;
        infracpu:any;
        infraram:any;
        totlpcpu:any;
        totlpram:any;



  constructor(private RessService:RessService, private CapacitiesService: CapacitiesService, private CurrentAppsService:CurrentAppsService) {}
  
   ngOnInit() {
  
    /*this.getComputes(this.idD);
    this.getStorages(this.idD);
    this.getControlNetworks(this.idD);
    this.getNetworkElements(this.idD);
    this.getComputesCapa();
    this.getStoragesCapa();
    this.getControlNetworkss();
    this.getDevicesCapa();
    this.RoadMapNeeds(this.idD);*/
    forkJoin([
      this.RessService.getComputes( 'AVAILABLE',this.idD),
      this.RessService.getStorages( 'AVAILABLE',this.idD),
      this.RessService.getControlNetworks( 'AVAILABLE',this.idD),
      this.RessService.getNetworkElements( 'AVAILABLE',this.idD),
      this.CapacitiesService.getComputesCapa(),
      this.CapacitiesService.getStorages(),
      this.CapacitiesService.getControlNetworks(),
      this.CapacitiesService.getDevicesCapa(),
      this.CurrentAppsService.getCurrentApps('CURRAPPOIAAS',this.idD,'AVAILABLE')
  
  ]).subscribe(([computesRes, storagesRes, controlnetworksRes,networkelementsRes,computesCapaRes,storagesCapaRes,controlnetsCapaRes,devicesCapaRes,oiaasRes]) => {
      // Les traitements après la réception de toutes les données
      this.computes = computesRes;
      this.storages = storagesRes;
      this.controlnetworks = controlnetworksRes;
      this.networkelements = networkelementsRes;
      this.computesCapa = computesCapaRes;
      this.storagesCapa = storagesCapaRes;
      this.controlnetsCapa = controlnetsCapaRes;
      this.devicesCapa = devicesCapaRes;
      this.oiaas=oiaasRes;
      
      this.getValues();
      this.calculatePorts();
  
  
  });
   
}

getValues(){

  this.computesfps=this.calculateTotal("sfps",this.computes)
  this.computesqty=this.calculateTotal("qty",this.computes)
  this.bcc=this.calculateTotal("bcvcpu",this.computes)
  this.bcr=this.calculateTotal("bcvram",this.computes)
  this.icc=this.calculateTotal("icvcpu",this.computes)
  this.icr=this.calculateTotal("icvram",this.computes)
  this.inc=this.calculateTotal("invcpu",this.computes)
  this.inr=this.calculateTotal("invram",this.computes)
  this.lpr=this.calculateTotal("bcngvram",this.computes)
  this.lpc=this.calculateTotal("bcngvcpu",this.computes)
    localStorage.setItem('bcc',this.bcc)
    localStorage.setItem('bcr',this.bcr)
    localStorage.setItem('icc',this.icc)
    localStorage.setItem('icr',this.icr)
    localStorage.setItem('inc',this.inc)
    localStorage.setItem('inr',this.inr)
    localStorage.setItem('lpr',this.lpr)
    localStorage.setItem('lpc',this.lpc)

  this.storagesfps = this.calculateTotal("sfps",this.storages);
  this.storageqty = this.calculateTotal("qty",this.storages);
  this.perf = this.calculateTotal("perfNetVolume",this.storages);
  this.capa = this.calculateTotal("capaNetVolume",this.storages);
    localStorage.setItem('perf', this.perf);
    localStorage.setItem('capa', this.capa);
  this.gperf = this.calculateTotal("perfGrossVolume",this.storages);
  this.gcapa = this.calculateTotal("capaGrossVolume",this.storages);

            
  this.controlNetworksfps = this.calculateTotal("sfps",this.controlnetworks);
  this.controlNetworkqty = this.calculateTotal("qty",this.controlnetworks);
  this.totsfps = this.storagesfps + this.computesfps + this.controlNetworksfps;
  this.totqty = this.storageqty + this.computesqty + this.controlNetworkqty;
        
              
  this.controlnetworks.forEach(e => {
     if (e.classOfControlNetwork === "Control node") {
          this.controlQty += e.qty;
                } });
        
  this.capacities = this.totqty - this.controlQty;
    localStorage.setItem("capaNodeA", this.capacities);

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
localStorage.setItem('free',this.free.toString())

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

/*getComputes(id:any){
  
  
  this.RessService.getComputes( 'AVAILABLE',id).subscribe(res => {
      this.computes=res
      this.computesfps=this.calculateTotal("sfps",this.computes)
      this.computesqty=this.calculateTotal("qty",this.computes)
      this.bcc=this.calculateTotal("bcvcpu",this.computes)
      this.bcr=this.calculateTotal("bcvram",this.computes)
      this.icc=this.calculateTotal("icvcpu",this.computes)
      this.icr=this.calculateTotal("icvram",this.computes)
      this.inc=this.calculateTotal("invcpu",this.computes)
      this.inr=this.calculateTotal("invram",this.computes)
      this.lpr=this.calculateTotal("bcngvram",this.computes)
      this.lpc=this.calculateTotal("bcngvcpu",this.computes)
        localStorage.setItem('bcc',this.bcc)
        localStorage.setItem('bcr',this.bcr)
        localStorage.setItem('icc',this.icc)
        localStorage.setItem('icr',this.icr)
        localStorage.setItem('inc',this.inc)
        localStorage.setItem('inr',this.inr)
        localStorage.setItem('lpr',this.lpr)
        localStorage.setItem('lpc',this.lpc)
      console.log(this.computesfps)
    }
  );
  
  
}*/
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

  this.newcompute.availablity=Availablity.Available;
  this.CapacitiesService.getComputeCapa(this.newcompute.classOfCompute).subscribe(res => {
    this.computeCapa=res;
    console.log(this.computeCapa)
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

  /*async getStorages(id: any): Promise<number> {
    return new Promise((resolve, reject) => {
        this.RessService.getStorages('AVAILABLE', id).subscribe(res => {
            this.storages = res;
            this.storagesfps = this.calculateTotal("sfps",this.storages);
            this.storageqty = this.calculateTotal("qty",this.storages);
            this.perf = this.calculateTotal("perfNetVolume",this.storages);
            this.capa = this.calculateTotal("capaNetVolume",this.storages);
            localStorage.setItem('perf', this.perf);
            localStorage.setItem('capa', this.capa);
            this.gperf = this.calculateTotal("perfGrossVolume",this.storages);
            this.gcapa = this.calculateTotal("capaGrossVolume",this.storages);
            resolve(this.storagesfps); // Résoudre la promesse avec la valeur de storagesfps
        }, error => {
            reject(error); // Rejeter la promesse en cas d'erreur
        });
    });
}
  
  /*async getStorages(id:any): Promise<any>{
  
  
    this.RessService.getStorages( 'AVAILABLE',id).subscribe(res => {
        this.storages=res
        this.storagesfps=this.calculateTotal("sfps",this.storages)
        this.storageqty=this.calculateTotal("qty",this.storages)
        this.perf=this.calculateTotal("perfNetVolume",this.storages)
        this.capa = this.calculateTotal("capaNetVolume",this.storages)
        localStorage.setItem('perf',this.perf)
        localStorage.setItem('capa',this.capa)
        this.gperf = this.calculateTotal("perfGrossVolume",this.storages)
        this.gcapa = this.calculateTotal("capaGrossVolume",this.storages)

        console.log("storage",this.storagesfps)
      }
    );
    
    
  }*/
  
  onSelectstorage(event: Event) {
    
    this.newstorage.classOfStorage = (event.target as HTMLSelectElement).value;
   
    
  }
  addStorageAva(id:any){

    this.newstorage.availablity=Availablity.Available;
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

    /*getControlNetworkss(){
      this.CapacitiesService.getControlNetworks().subscribe(res => {
          this.controlnetsCapa=res;
        }
      ); 
    }
  
    /*async getControlNetworks(id: any): Promise<number> {
      return new Promise(async (resolve, reject) => {
        this.storagesfps = await this.getStorages(this.idD);
    
        this.RessService.getControlNetworks('AVAILABLE', id).subscribe(res => {
          this.controlnetworks = res;
          this.controlNetworksfps = this.calculateTotal("sfps",this.controlnetworks);
          this.controlNetworkqty = this.calculateTotal("qty",this.controlnetworks);
          this.totsfps = this.storagesfps + this.computesfps + this.controlNetworksfps;
          this.totqty = this.storageqty + this.computesqty + this.controlNetworkqty;
    
          
          this.controlnetworks.forEach(e => {
            if (e.classOfControlNetwork === "Control node") {
              this.controlQty += e.qty;
            }
          });
    
          this.capacities = this.totqty - this.controlQty;
          localStorage.setItem("capaNodeA", this.capacities);
          console.log("controlNetworksfps", this.controlNetworksfps);
          console.log("sfps", this.totsfps);
          console.log("sfpstorage", this.storagesfps);
          console.log("sfpscompute", this.computesfps);
          console.log("sfpscn", this.controlNetworksfps);
          resolve(this.totsfps);
        }, error => {
        
      
        reject(error); // Rejeter la promesse en cas d'erreur
    });
});
    }*/
    
    
      addControlNetworkAva(id:any){

        this.newcontrolnetwork.availablity=Availablity.Available;
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

          this.newdevice.availablity=Availablity.Available;
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


             
        
        getNetworkElements(id:any){
  
  
          this.RessService.getNetworkElements( 'AVAILABLE',id).subscribe(res => {
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
            
        
            this.RessService.updateCompute(this.updatecompute,id).subscribe()
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
            this.RessService.updateStorage(this.updatestorage,id).subscribe()
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
            
            
            this.RessService.updateCN(this.updatecontrolnetwork,id).subscribe()
            window.location.reload();
          }
        ); 



          
        }

        

        calculateTotal(p: string, items: any[]): number {
          return items.reduce((total, item) => {
            return total + parseFloat(item[p] || 0);
          }, 0);
        }
        RoadMapNeeds(id:any){
    
    
          this.CurrentAppsService.getCurrentApps('CURRAPPOIAAS',id,'AVAILABLE').subscribe(res => {
              this.oiaas=res
              this.incpu=this.calculateTotal("bcNgVcpu",this.oiaas)
              this.inram=this.calculateTotal("bcNgRam",this.oiaas)
              this.icram=this.calculateTotal("icRam",this.oiaas)
              this.iccpu=this.calculateTotal("icVcpu",this.oiaas)
              this.bccpu=this.calculateTotal("bcVcpu",this.oiaas)
              this.bcram=this.calculateTotal("bcRam",this.oiaas)
              this.perfoiaas=this.calculateTotal("perfStorage",this.oiaas)
              this.capaoiaas=this.calculateTotal("capaStorage",this.oiaas)
              
            });
            this.CurrentAppsService.getCurrentApps('CURRAPPLOCALPAAS',id,'AVAILABLE').subscribe(res => {
              this.paas=res
              
            });
            this.CurrentAppsService.getCurrentApps('CURRRESSLOCALPAAS',id,'AVAILABLE').subscribe(res => {
              this.resspaas=res
              this.lpcpu=this.calculateTotal("bcNgVcpu",this.resspaas)
              this.lpram=this.calculateTotal("bcNgRam",this.resspaas)
              this.perfapps=this.calculateTotal("perfStorage",this.resspaas)
              this.capaapps=this.calculateTotal("capaStorage",this.resspaas)
              this.getram()
              
            }
          );
          
          
          
        }
        



        getram(){
          this.paas.forEach(z => {
            switch (z.name) {
              case "Local PaaS Flavors capacity":
                this.ram=this.lpram/z.bcNgRam
                this.cpu=this.lpcpu/z.bcNgVcpu
                this.workersNb = Math.max(this.ram, this.cpu);
                this.workersNbExact = Math.ceil(this.workersNb);
                this.workersCpu=this.workersNbExact*z.bcNgVcpu
                this.workersRam=this.workersNbExact*z.bcNgRam
                this.workersPerfStorage=this.workersNbExact*z.perfStorage
                this.workersCapaStorage=this.workersNbExact*z.capaStorage
    
                this.capaa=this.workersCapaStorage+this.capaapps+this.capaoiaas+this.infracapa
                this.perfa=this.workersPerfStorage+this.perfapps+this.perfoiaas+this.infraperf
    
                
    
                console.log(this.lpram)
                console.log(z.bcNgRam)
                console.log(this.ram)
                console.log(this.cpu)
    
                
                break;
                case "Local PaaS Infra & CS":
                  this.infracpu=z.bcNgVcpu
                  this.infraram=z.bcNgRam
                  this.infraperf=z.perfStorage
                  this.infracapa=z.capaStorage
                
    
                
                break;
              default:
                
                break;
            }
          });
          this.totlpcpu=this.infracpu+this.workersCpu
          this.totlpram=this.infraram+this.workersRam
    
    
    
        localStorage.setItem('bcca',(this.bcc-this.bccpu).toString())
            localStorage.setItem('bcra',(this.bcr-this.bcram).toString())
            localStorage.setItem('icca',(this.icc-this.iccpu).toString())
            localStorage.setItem('icra',(this.icr-this.icram).toString())
            localStorage.setItem('inca',(this.inc-this.incpu).toString())
            localStorage.setItem('inra',(this.inr-this.inram).toString())
            localStorage.setItem('lpra',(this.lpr-this.totlpram).toString())
            localStorage.setItem('lpca',(this.lpc-this.totlpcpu).toString())
            localStorage.setItem('capaa',(this.capa-this.capaa).toString())
            localStorage.setItem('perfa',(this.perf-this.perfa).toString())
        
        }


        
        
    

}


