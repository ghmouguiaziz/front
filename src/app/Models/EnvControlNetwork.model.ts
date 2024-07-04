export class EnvControlNetwork{
    idControlNetwork!:any;
    classOfControlNetwork!:any;
    qty!:any;
    spareQty!:any;
    sfpspare!:any;
    sfps!:any;
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