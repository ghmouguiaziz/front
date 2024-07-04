
import { Component, OnInit } from '@angular/core';
import { ComputeCapacities } from 'app/Models/ComputeCapacities.model';
import { ControlNetworkCapacities } from 'app/Models/ControlNetworkCapacities.model';
import { NetworkElementsCapacities } from 'app/Models/NetworkElementsCapacities.model';
import { StorageCapacities } from 'app/Models/StorageCapacities.model';
import { CapacitiesService } from 'app/Services/capacities.service';
import { ToastService } from 'app/Services/toast.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-Capacities',
  templateUrl: './Capacities.component.html',
  styleUrls: ['./Capacities.component.css']
})
export class CapacitiesComponent implements OnInit {
computes:any;
idC:any;
newcompute=new ComputeCapacities();
updatecompute=new ComputeCapacities();
storages:any;
idS:any;
newstorage=new StorageCapacities();
updatestorage=new StorageCapacities();
controlnetworks:any;
idCN:any;
newcontrolnetwork=new ControlNetworkCapacities();
updatecontrolnetwork=new ControlNetworkCapacities();
devices:any;
idD:any;
newdevice=new NetworkElementsCapacities();
updatedevice=new NetworkElementsCapacities();
admin:any;
  constructor(private CapacitiesService : CapacitiesService , private toastService:ToastService, private kc: KeycloakService) { }

  ngOnInit(): void {
    
    this.admin= this.kc.isUserInRole("admin")
      
    this.getComputesCapa();
    this.getStorages();
    this.getControlNetworks();
    this.getDevicesCapa();
    
    
  }
  
  getComputesCapa(){
    this.CapacitiesService.getComputesCapa().subscribe(res => {
        this.computes=res;
      }
    ); 
  }
  
  onSelectClass(event: Event) {
    
    this.newcompute.classOfCompute = (event.target as HTMLSelectElement).value;
   
    
  }
  addCompute(){
    
    this.CapacitiesService.addCompute(this.newcompute).subscribe(() => {
    },
    (error) => {
      if (error.status==200){
        this.added()
        this.getComputesCapa()
      }
      else {
        this.error()
      }
    }
  );
  }
  DeleteCompute(id:any){
    this.CapacitiesService.DeleteCompute(id).subscribe(() => {
    },
    (error) => {
      if (error.status==200){
        this.deleted()
        this.getComputesCapa()
      }
      else {
        this.error()
      }
    }
  );
  }
  getidC(c:any){
this.idC=c;
  }
  onSelectSClass(event: Event) {
    
    this.newstorage.classOfStorage = (event.target as HTMLSelectElement).value;
   
    
  }
  getStorages(){
    this.CapacitiesService.getStorages().subscribe(res => {
        this.storages=res;
      }
    ); 
  }
  addStorage(){
    this.newstorage.volumeBrut=this.newstorage.diskNumber*this.newstorage.diskVolume;
    this.newstorage.volumeNet=this.newstorage.volumeBrut/3*75/100;
    this.CapacitiesService.addStorage(this.newstorage).subscribe(() => {
    },
    (error) => {
      if (error.status==200){
        this.added()
        this.getStorages()
      }
      else {
        this.error()
      }
    }
  );
  }
  deleteStorage(id:any){
    this.CapacitiesService.deleteStorage(id).subscribe(() => {
    },
    (error) => {
      if (error.status==200){
        this.deleted()
        this.getStorages()
      }
      else {
        this.error()
      }
    }
  );
  }
  getidS(c:any){
    this.idS=c;
      }

      
      onSelectSNClass(event: Event) {
    
        this.newcontrolnetwork.classOfcontrolNetwork = (event.target as HTMLSelectElement).value;
       
        
      }
 getControlNetworks(){
    this.CapacitiesService.getControlNetworks().subscribe(res => {
        this.controlnetworks=res;
      }
    ); 
  }
  addControlNetwork(){
    
    this.CapacitiesService.addControlNetwork(this.newcontrolnetwork).subscribe(() => {
    },
    (error) => {
      if (error.status==200){
        this.added()
        this.getControlNetworks()
      }
      else {
        this.error()
      }
    }
  );
  }
  deleteControlNetwork(id:any){
    this.CapacitiesService.deleteControlNetwork(id).subscribe(() => {
    },
    (error) => {
      if (error.status==200){
        this.deleted()
        this.getControlNetworks()
      }
      else {
        this.error()
      }
    }
  );
  }
  getidCN(c:any){
    this.idCN=c;
      }
      getupdatecompute(u:any){
        this.updatecompute=u;
      }
      updateCompute(id:any){
        this.CapacitiesService.updateCompute(this.updatecompute,id).subscribe(() => {
        },
        (error) => {
          if (error.status==200){
            this.updated()
          }
          else {
            this.error()
          }
        }
      );
      }
      getupdatestorage(u:any){
        this.updatestorage=u;
      }
      updateStorage(id:any){
        this.CapacitiesService.updateStorage(this.updatestorage,id).subscribe(() => {
        },
        (error) => {
          if (error.status==200){
            this.updated()
          }
          else {
            this.error()
          }
        }
      );
      }
      getupdatecontrolnetwork(u:any){
        this.updatecontrolnetwork=u;
      }
      updateControlNetwork(id:any){
        this.CapacitiesService.updateControlNetwork(this.updatecontrolnetwork,id).subscribe(() => {
        },
        (error) => {
          if (error.status==200){
            this.updated()
          }
          else {
            this.error()
          }
        }
      );
      }
      onSelectDevice(event: Event) {
    
        this.newdevice.name = (event.target as HTMLSelectElement).value;
       
        
      }
      addDevice(){
    
        this.CapacitiesService.addDevice(this.newdevice).subscribe(() => {
        },
        (error) => {
          if (error.status==200){
            this.added()
            this.getDevicesCapa()
          }
          else {
            this.error()
          }
        }
      );
      }
      getDevicesCapa(){
        this.CapacitiesService.getDevicesCapa().subscribe(res => {
            this.devices=res;
          }
        ); 
      }
      getidD(c:any){
        this.idD=c;
      }
      DeleteDevice(id:any){
        this.CapacitiesService.deleteDevice(id).subscribe(() => {
        },
        (error) => {
          if (error.status==200){
            this.deleted()
            this.getDevicesCapa()
          }
          else {
            this.error()
          }
        }
      );
      }
      getupdateDevice(u:any){
        this.updatedevice=u;
      }
      updateDevice(id:any){
        this.CapacitiesService.updateDevice(this.updatedevice,id).subscribe(() => {
        },
        (error) => {
          if (error.status==200){
            this.updated()
          }
          else {
            this.error()
          }
        }
      );
      }
      added() {
        this.toastService.show('Added successfully', 'success');
        setTimeout(() => {
          this.toastService.remove()
        
        }, 5000);
      }

      updated() {
        this.toastService.show('Updated successfully', 'success');
        setTimeout(() => {
          this.toastService.remove()
        
        }, 5000);
      }

      deleted() {
        this.toastService.show('Deleted successfully', 'success');
        setTimeout(() => {
          this.toastService.remove()
        
        }, 5000);
      }
    
      error() {
        this.toastService.show('Error! Somthing was wrong', 'danger');
        setTimeout(() => {
          this.toastService.remove()
        
        }, 5000);
      }
}
