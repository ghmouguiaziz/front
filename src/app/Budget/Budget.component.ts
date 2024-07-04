import { Component, OnInit } from '@angular/core';
import { RessService } from 'app/Services/ress.service';
import { ServersAndDevicesPriceService } from 'app/Services/servers-and-devices-price.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-Budget',
  templateUrl: './Budget.component.html',
  styleUrls: ['./Budget.component.css']
})
export class BudgetComponent implements OnInit {
  idD:any=localStorage.getItem('idD');
  storages:any;
  computes:any;
  controlnetworks:any;
  devices:any;

  builds:any;
  runs:any;
  upgrades:any;

  selected:any;

  hwComputes:any=0;
  hwStorages:any=0;
  hwControlNetworks:any=0;
  hwDevices:any=0;
  installationCosts:any=0;

  RAL1:any=0;
  RAL3:any=0;
  RAPC:any=0;
  RM:any=0;
  T:any=0;
  AT:any=0;
  ELS:any=0;
  ost:any=0;
  osh:any=0;
  nbM:any=12;
  nb:any;
  capaNodeR:any=localStorage.getItem('capaNodeR');
  capaNodeA:any=localStorage.getItem('capaNodeA');
  level:any;

  hwComputesLP:any=0;
  installationCostsLP:any=0;

  buildLP:any=0;
  build:any=0;
  selectedBuild:any;

  Budget:any;

  computeCapa:any;
  provider:any;
  providerS:any;
buildsByProvider:any;

  constructor(private RessService:RessService, private ServersAndDevicesPriceService:ServersAndDevicesPriceService ) { }

  ngOnInit() {

    /*this.getPrices()
    this.getStorages(this.idD)
    this.getComputes(this.idD)
    this.getControlNetworks(this.idD)
    this.getNetworkElements(this.idD)
*/
    forkJoin([
      this.RessService.getStorages('REQUIRED',this.idD),
      this.RessService.getComputes('REQUIRED',this.idD),
      this.RessService.getControlNetworks('REQUIRED',this.idD),
      this.RessService.getNetworkElements('REQUIRED',this.idD),
      this.ServersAndDevicesPriceService.getServicesPrice('BUILD'),
      this.ServersAndDevicesPriceService.getServicesPrice('RUN'),
      this.ServersAndDevicesPriceService.getServicesPrice('UPGRADE')
    ]).subscribe(([storagesRes,computesRes,controlnetworksRes,devicesRes,buildsRes,runsRes,upgradesRes]) => {

      this.storages= storagesRes;
      this.computes= computesRes;
      this.controlnetworks= controlnetworksRes;
      this.devices= devicesRes;
      this.builds=buildsRes;
      this.runs=runsRes;
      this.upgrades=upgradesRes;

      this.getValues();
    });



  }
  getStorages(id:any){
    this.RessService.getStorages( 'REQUIRED',id).subscribe(res => {
        this.storages=res});}

  getComputes(id:any){
    this.RessService.getComputes( 'REQUIRED',id).subscribe(res => {
        this.computes=res


        console.log(this.selected)

      });}

        getControlNetworks(id:any){
    this.RessService.getControlNetworks( 'REQUIRED',id).subscribe(res => {
        this.controlnetworks=res

      });}
      getPricesByProvider(p:any){
        this.ServersAndDevicesPriceService.getPricesByProvider(p).subscribe(res =>{
          this.buildsByProvider=res
        });
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


        getNetworkElements(id:any){
          this.RessService.getNetworkElements( 'REQUIRED',id).subscribe(res => {
              this.devices=res
              this.getValues()});}


              getValues(){
                this.computes.forEach(e => {
                  this.RessService.getPrice(e.classOfCompute).subscribe(res => {
                    this.selected=res
                    if(this.selected.name.toLowerCase().includes("local")||this.selected.name.toLowerCase().includes("paas")){
                      this.hwComputesLP=this.hwComputesLP+this.selected.euroPrice*e.qty;
                      this.installationCostsLP=this.installationCostsLP+this.selected.euroPrice*e.qty*20/100
                    }
                    else{
                      this.hwComputes=this.hwComputes+this.selected.euroPrice*e.qty
                      this.installationCosts=this.installationCosts+this.selected.euroPrice*e.qty*20/100
                    }
                    this.builds.forEach(e => {

                      switch (e.name.toLowerCase()){

                      case "local paas":
                        console.log(this.hwComputesLP)
                      if (this.hwComputesLP!=0){
                        console.log(this.builds)

                      this.buildLP=e.price}
                      break;

                      default:

                        break;

                    }
                    })


                })
              })

              this.storages.forEach(e => {
                this.RessService.getPrice(e.classOfStorage).subscribe(res => {
                  this.selected=res

                    this.hwStorages=this.hwStorages+this.selected.euroPrice*e.qty;
                    this.installationCosts=this.installationCosts+this.selected.euroPrice*e.qty*20/100
                  })
                })

                this.controlnetworks.forEach(e => {
                  this.RessService.getPrice(e.classOfControlNetwork).subscribe(res => {
                    this.selected=res
                    console.log(e.classOfControlNetwork)
                    console.log(this.selected)

                      this.hwControlNetworks=this.hwControlNetworks+this.selected.euroPrice*e.qty;
                      this.installationCosts=this.installationCosts+this.selected.euroPrice*e.qty*20/100
                    })
                  })
                  this.devices.forEach(e => {
                    this.RessService.getPrice(e.name).subscribe(res => {
                      this.selected=res


                        this.hwDevices=this.hwDevices+this.selected.euroPrice*e.qty;
                        this.installationCosts=this.installationCosts+this.selected.euroPrice*e.qty*20/100

                      })
                    })




                    this.runs.forEach(e => {
                      if (e.name.toLowerCase().includes("local") || e.name.toLowerCase().includes("paas")){
                         this.RAPC=this.RAPC+e.price
                         console.log(this.RAPC)
                         console.log(e.price)
                      }

                    });








            }



            onSelectProvider(event: Event) {
              this.selectedBuild="";
              this.build=0;
              this.provider = (event.target as HTMLSelectElement).value;
              this.getPricesByProvider(this.provider)




            }
            onSelectName(event: Event) {

              const name = (event.target as HTMLSelectElement).value;
              this.buildsByProvider.forEach(e => {
                if (e.name==name){this.build=e.price}
              });


            }
            getUniqueProvider() {

              const uniqueNames = new Set<string>();


              const uniqueBuilds = this.builds.filter(build => {
                if (!uniqueNames.has(build.provider)&&build.provider) {
                  uniqueNames.add(build.provider);
                  return true;
                }
                return false;
              });

              return uniqueBuilds;
            }
            getUniqueProviderS() {

              const uniqueNames = new Set<string>();


              const uniqueBuilds = this.runs.filter(run => {
                if (!uniqueNames.has(run.provider)&&run.provider) {
                  uniqueNames.add(run.provider);
                  return true;
                }
                return false;
              });

              return uniqueBuilds;
            }

            onSelectProviderS(event: Event) {

              this.providerS = (event.target as HTMLSelectElement).value;
              if (this.providerS.toLowerCase()=="gnoca"){
                this.runs.forEach(e => {
                  if (e.name.toLowerCase().includes("zone") && e.provider.toLowerCase()=="gnoca"){
                    this.RAL1=e.price*this.nbM/12
                  }
                });
              }
              if (this.providerS.toLowerCase()=="nsso"){
                this.RAL1=0;
                this.runs.forEach(e => {
                  if (e.name.toLowerCase().includes("1&2") && e.provider.toLowerCase()=="nsso" && e.name.toLowerCase().includes("zone")){
                     this.RAL1=this.RAL1+e.price
                     console.log(this.RAL1)
                     console.log(e.price)
                  }
                  if (e.name.toLowerCase().includes("1&2") && e.provider.toLowerCase()=="nsso" && e.name.toLowerCase().includes("server")){
                    this.RAL1=this.RAL1+e.price*this.capaNodeA+e.price*this.capaNodeR
                    console.log(this.RAL1)
                    console.log(this.capaNodeR)
                    console.log(this.capaNodeA)
                    console.log(e.price)
                  }
                });
                this.RAL1=this.RAL1*this.nbM/12
              }




            }
            onSelectProviderL(event: Event) {
              this.RAL3=0;
              this.level = (event.target as HTMLSelectElement).value;

                this.runs.forEach(e => {
                  if (e.name.toLowerCase().includes(this.level.toLowerCase())  && e.name.toLowerCase().includes("zone")){
                     this.RAL3=this.RAL3+e.price
                     console.log(this.RAL3)
                     console.log(e.price)
                  }
                  if (e.name.toLowerCase().includes(this.level.toLowerCase())  && e.name.toLowerCase().includes("server")){
                    this.RAL3=this.RAL3+e.price*this.capaNodeA+e.price*this.capaNodeR
                    console.log(this.RAL3)
                    console.log(this.capaNodeR)
                    console.log(this.capaNodeA)
                    console.log(e.price)
                  }
                });
                this.RAL3=this.RAL3*this.nbM/12





            }
            onSelectProviderR(event: Event) {
              this.RM=0;
              this.nb = (event.target as HTMLSelectElement).value;

                this.upgrades.forEach(e => {
                  if (e.name.toLowerCase().includes("upgrade")){
                     this.RM=this.RM+e.price
                     console.log(this.RM)
                     console.log(e.price)
                  }

                });
                this.RM=this.RM*this.nb





            }

            calculateBudget(){
              this.Budget=this.hwControlNetworks+this.hwComputes+this.hwStorages+this.hwDevices+this.installationCosts+this.build+this.hwComputesLP+this.installationCostsLP+this.buildLP+this.RM+this.RAL1+this.RAL3+this.T+this.AT+this.ELS+this.ost+this.osh+this.RAPC
            }


}
