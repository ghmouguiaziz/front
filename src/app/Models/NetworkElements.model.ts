
export class NetworkElements{
    idElements!:any;
    name!:any;
    qty!:any;
    spareQty!:any;
    ports!:any;
    used!:any;
    free!:any;
    annee!:any;
    availablity!:Availablity;
    champ!:Champ;
    actDate!:any;
}

export enum Champ {
    Extension='EXTENSION',
    Initial='INITIAL'
}
export enum Availablity {
    Available='AVAILABLE',
    Required='REQUIRED'
}