import { Component, OnInit } from '@angular/core';
import { CurrentAppsService } from 'app/Services/current-apps.service';
import { Resources } from 'app/Models/CurrentApps.model'; 
import { TypeResource } from 'app/Models/CurrentApps.model';
import { Availablity } from 'app/Models/CurrentApps.model';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-CurrentApps',
  templateUrl: './CurrentApps.component.html',
  styleUrls: ['./CurrentApps.component.css']
})
export class CurrentAppsComponent implements OnInit {
data:any;
oiaas:any;
paas:any;
resspaas:any;
idD:any;
id:any;
newapp=new Resources()
updateapp=new Resources()
bcc:any;
bcr:any;
icc:any;
icr:any;
lpc:any;
lpr:any;
inc:any;
inr:any;

tbcc:any;
tbcr:any;
ticc:any;
ticr:any;
tlpc:any;
tlpr:any;
tinc:any;
tinr:any;
tperf:any;
tcapa:any;


capa:any;
perf:any;

capaa:any;
perfa:any;
infraperf:any;
infracapa:any;



perfoiaas:any;
capaoiaas:any;
perfapps:any;
capaapps:any;


bcram:any;
bccpu:any;
icram:any;
iccpu:any;
lpcpu:any;
lpram:any;
incpu:any;
inram:any;

ram:any;
cpu:any;
workersNb:any;
workersNbExact:any;
workersRam:any;
workersCpu:any;
workersPerfStorage:any;
workersCapaStorage:any;
totlpcpu:any;
totlpram:any;
infracpu:any;
infraram:any;

  constructor( private CurrentAppsService:CurrentAppsService) { }
  
  async ngOnInit() {
    
    
      
    this.idD =localStorage.getItem('idD')
    this.data =localStorage.getItem('data')
    this.bcc=localStorage.getItem('bcc')
        this.bcr=localStorage.getItem('bcr')
        this.icc=localStorage.getItem('icc')
        this.icr=localStorage.getItem('icr')
        this.inc=localStorage.getItem('inc')
        this.inr=localStorage.getItem('inr')
        this.lpr=localStorage.getItem('lpr')
        this.lpc=localStorage.getItem('lpc')

        this.capa=localStorage.getItem('capa')
        this.perf=localStorage.getItem('perf')
    console.log(this.idD)

    forkJoin([
      this.CurrentAppsService.getCurrentApps('CURRAPPOIAAS', this.idD, 'AVAILABLE'),
      this.CurrentAppsService.getCurrentApps('CURRAPPLOCALPAAS', this.idD, 'AVAILABLE'),
      this.CurrentAppsService.getCurrentApps('CURRRESSLOCALPAAS', this.idD, 'AVAILABLE')
  ]).subscribe(([oiaasRes, paasRes, resspaasRes]) => {
      this.oiaas = oiaasRes;
      this.paas = paasRes;
      this.resspaas = resspaasRes;
      // Autres traitements après la réception de toutes les données
      this.getValues();
      this.getram();


  });



    
   
    
  
    
    
    
  }
  /*getCurrentApps(id:any){
    
    
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
        console.log("paas:", this.paas)
        
      });
      this.CurrentAppsService.getCurrentApps('CURRRESSLOCALPAAS',id,'AVAILABLE').subscribe(res => {
        this.resspaas=res
        this.lpcpu=this.calculateTotal("bcNgVcpu",this.resspaas)
        this.lpram=this.calculateTotal("bcNgRam",this.resspaas)
        this.perfapps=this.calculateTotal("perfStorage",this.resspaas)
        this.capaapps=this.calculateTotal("capaStorage",this.resspaas)
        this.getram();
        
      }
    );
    
    
    
  }*/
  getValues(){
        this.incpu=this.calculateTotal("bcNgVcpu",this.oiaas)
        this.inram=this.calculateTotal("bcNgRam",this.oiaas)
        this.icram=this.calculateTotal("icRam",this.oiaas)
        this.iccpu=this.calculateTotal("icVcpu",this.oiaas)
        this.bccpu=this.calculateTotal("bcVcpu",this.oiaas)
        this.bcram=this.calculateTotal("bcRam",this.oiaas)
        this.perfoiaas=this.calculateTotal("perfStorage",this.oiaas)
        this.capaoiaas=this.calculateTotal("capaStorage",this.oiaas)
        this.lpcpu=this.calculateTotal("bcNgVcpu",this.resspaas)
        this.lpram=this.calculateTotal("bcNgRam",this.resspaas)
        this.perfapps=this.calculateTotal("perfStorage",this.resspaas)
        this.capaapps=this.calculateTotal("capaStorage",this.resspaas)
  }
  addAppOIaaS(id:any){
    this.newapp.type=TypeResource.CurrAppOIaaS;
    this.newapp.availablity=Availablity.Available;
    this.CurrentAppsService.addApp(this.newapp, id).subscribe()
      window.location.reload()
    }
  
  addAppPaaS(id:any){
    this.newapp.type=TypeResource.CurrAppLocalPaaS;
    this.newapp.availablity=Availablity.Available;
    this.CurrentAppsService.addApp(this.newapp, id).subscribe()
      window.location.reload()
    }
  

  addAppRessPaaS(id:any){
    this.newapp.type=TypeResource.CurrRessLocalPaaS;
    this.newapp.availablity=Availablity.Available;
    this.CurrentAppsService.addApp(this.newapp, id).subscribe()
      window.location.reload()
    }

    
    
    calculateTotal(p: string, items: any[]): number {
      return items.reduce((total, item) => {
        return total + parseFloat(item[p] || 0);
      }, 0);
    }

    getram(){
      console.log("paas:", this.paas)
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
              this.infraperf=z.perfStorage;
              this.infracapa=z.capaStorage
            

            
            break;
          default:
            
            break;
        }
      });
      this.totlpcpu=this.infracpu+this.workersCpu
      this.totlpram=this.infraram+this.workersRam




      this.tbcc=Math.round((this.bcc-this.bccpu)/this.bcc*100)
    this.tbcr=Math.round((this.bcr-this.bcram)/this.bcr*100)
    this.tlpc=Math.round((this.lpc-this.totlpcpu)/this.lpc*100)
    this.tlpr=Math.round((this.lpr-this.totlpram)/this.lpr*100)
    this.ticc=Math.round((this.icc-this.iccpu)/this.icc*100)
    this.ticr=Math.round((this.icr-this.icram)/this.icr*100)
    this.tinc=Math.round((this.inc-this.incpu)/this.inc*100)
    this.tinr=Math.round((this.inr-this.inram)/this.inr*100)
    this.tperf=Math.round((this.perf-this.perfa)/this.perf*100)
      this.tcapa=Math.round((this.capa-this.capaa)/this.capa*100)

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

    onSelectN(event: Event) {
    
      this.newapp.name = (event.target as HTMLSelectElement).value;
     
      
    }



    getid(c:any){
      this.id=c;
    }
    deleteApp(id:any){
      this.CurrentAppsService.deleteApp(id).subscribe()
      
      window.location.reload()
    }
    getupdateApp(u:any){
      this.updateapp=u;
    }
    updateApp(id:any){
      this.CurrentAppsService.updateApp(this.updateapp,id).subscribe()
      window.location.reload();
    }


    
  

  }
  


