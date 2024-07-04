import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AffiliateService } from 'app/Services/affiliate.service';
import { ZoneService } from 'app/Services/zone.service';
import { DataCenterService } from 'app/Services/data-center.service';
import { Zone } from 'app/Models/Zone.model';
import { Affiliate } from 'app/Models/Affiliate.model';
import { DataCenter } from 'app/Models/DataCenter.model';
import { KeycloakService } from 'keycloak-angular';
import { ToastService } from 'app/Services/toast.service';


@Component({
  selector: 'zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent  {
 zone: string='';
 aff: string='';
 affName:string='';
 data: string='';
 zones:any;
 affs:any;
 datacenters:any;
 idZ:any;
 idA:any;
 idD:any;
 admin:boolean;
 newzone=new Zone();
 newaff=new Affiliate();
 newdata=new DataCenter();
 updatezone=new Zone();
 updateaff=new Affiliate();
 updatedata=new DataCenter();
 

  constructor(private router: Router , private toastService: ToastService, private ZoneService: ZoneService, private AffiliateService: AffiliateService, private DataCenterService: DataCenterService, private kc:KeycloakService ) {}

  

 
   ngOnInit() {
    this.getToken();
    this.getZones();
  }
  async getToken() {
    try {
      const inst = await this.kc.getKeycloakInstance();
      console.log(inst);
      this.admin= this.kc.isUserInRole("admin")
  
      if (inst.authenticated) {
        const token = await this.kc.getToken();
        console.log('Token:', token);
      } else {
        console.error('Keycloak not authenticated.');
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
  }
    
    
    
  
  
  getZones(){
    this.ZoneService.getZones().subscribe(res => {
        this.zones=res ;
        
      }
    ); 
  }
  onSelectZoneChange(event: Event) {
    
    this.zone = (event.target as HTMLSelectElement).value;
    this.getAffiliates(this.zone)
  }
  addZone(){
    
    this.ZoneService.addZone(this.newzone).subscribe(response => {
      console.log(response);
       
  }, error => {
      console.error('Error:', error);
      //window.location.reload();
  });
}
  deleteZone(id:any){
    this.ZoneService.deleteZone(id).subscribe(
      () => {
      },
      (error) => {
        console.error('Error:', error);
        if (error.status==200){
          this.deleted()
          this.getZones()
        }
        else {
          this.error()
        }
        
      }
    );

  }
  
  
  getAffiliates(name:String){
    
    
    this.AffiliateService.getAffiliates(name).subscribe(res => {
        this.affs=res ;
      }
    ); 
  }
  onSelectAffChange(event: Event) {
    
    this.aff = (event.target as HTMLSelectElement).value;
    this.getDataCenters(this.aff)
    this.getAffName(this.aff)
  }
  addAffiliate(idZ:any){
    
    this.ZoneService.addAffiliate(this.newaff, idZ).subscribe(
      () => {
      },
      (error) => {
        console.error('Error:', error);
        if (error.status==200){
          this.added()
          this.getAffiliates(this.zone)
        }
        else {
          this.error()
        }
        
      }
    );

  }
  deleteAffiliate(id:any){
    this.ZoneService.deleteAffiliate(id).subscribe(
      () => {
      },
      (error) => {
        console.error('Error:', error);
        if (error.status==200){
          this.deleted()
          this.getAffiliates(this.zone)
        }
        else {
          this.error()
        }
        
      }
    );

  }

  getDataCenters(name:String){
    
    
    this.DataCenterService.getDataCenters(name).subscribe(res => {
      this.datacenters=res;
      }
    );

    }
    onSelectDataChange(event: Event) {
    
      this.data = (event.target as HTMLSelectElement).value;
      this.confirmData()
      
    }
    confirmData() {
      {
        this.getidData(this.data)
        localStorage.setItem('data',this.data)
        localStorage.setItem('idD',this.idD)
        localStorage.setItem('zone',this.zone)
        localStorage.setItem('aff',this.aff)
        localStorage.setItem('affName',this.affName)
        
      }
    }
    addDataCenter(idA:any){
    
      this.ZoneService.addDataCenter(this.newdata, idA).subscribe(
        () => {
        },
        (error) => {
          console.error('Error:', error);
          if (error.status==200){
            this.added()
            this.getDataCenters(this.aff)
          }
          else {
            this.error()
          }
          
        }
      );
  
    }
    deleteDataCenter(id:any){
      this.ZoneService.deleteDataCenter(id).subscribe(
        () => {
        },
        (error) => {
          console.error('Error:', error);
          if (error.status==200){
            this.added()
            this.getDataCenters(this.aff)
          }
          else {
            this.error()
          }
          
        }
      );
  
    }
  confirm() {
    if (this.data!=''){
      
      this.router.navigate(['/CurrentResources']);
    }
  }

  getidZone(c:any){
    this.zones.forEach(z => {
      switch (z.name) {
        case c:
          this.idZ=z.idZone;
          this.updatezone=z;
          
          
          break;
        
        default:
          
          break;
      }
    });
        
    
  }
  getidAff(c:any){
    this.affs.forEach(a => {
      switch (a.name) {
        case c:
          this.idA=a.idAffiliate;
          
          this.updateaff=a;
          

          
          console.log(this.zones)
          
          
          break;
        
        default:
          
          break;
      }
    });
        
    
  }
  getAffName(c:any){
    this.affs.forEach(a => {
      switch (a.name) {
        case c:
          
          this.affName=a.fullName;
          console.log(this.affName)
          
          console.log(this.zones)
          
          
          break;
        
        default:
          
          break;
      }
    });
        
    
  }
  getidData(c:any){
    this.datacenters.forEach(d => {
      switch (d.name) {
        case c:
          this.idD=d.idDataCenter;
          this.updatedata=d
          
          break;
        
        default:
          
          break;
      }
    });
        
    
  }

  updateZone(id:any){
    this.ZoneService.updateZone(this.updatezone,id).subscribe(
      () => {
      },
      (error) => {
        console.error('Error:', error);
        if (error.status==200){
          this.updated()
        }
        else {
          this.error()
        }
        
      }
    );

  }
  updateAffiliate(id:any){
    this.ZoneService.updateAffiliate(this.updateaff,id).subscribe(
      () => {
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
  updateDataCenter(id:any){
    this.ZoneService.updateDataCenter(this.updatedata,id).subscribe(
      () => {
      },
      (error) => {
        console.error('Error:', error);
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
