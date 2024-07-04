export class Resources { 
    idResources!:any;
    name!:any;
    annee!:any;
    bcVcpu!:any;
    bcRam!:any;
    bcNgVcpu!:any;
    bcNgRam!:any;
    icVcpu!:any;
    icRam!:any;
    perfStorage!:any;
    capaStorage!:any;
    hypothesys!:any;
    availablity!:Availablity;
    type!:TypeResource;

  }
  export enum TypeResource {
    CurrAppOIaaS = 'CURRAPPOIAAS',
    CurrAppLocalPaaS = 'CURRAPPLOCALPAAS',
    CurrRessLocalPaaS = 'CURRRESSLOCALPAAS',
  }
  export enum Availablity {
    Available='AVAILABLE',
    Required='REQUIRED'
}