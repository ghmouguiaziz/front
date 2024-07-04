export class EnvCompute{
    idCompute!:any;
    classOfCompute!:any;
    qty!:any;
    spareQty!:any;
    vcpu!:any;
    cpu!:any;
    annee!:any;
    vram!:any;
    bcvcpu!:any;
    bcvram!:any;
    bcngvcpu!:any;
    bcngvram!:any;
    icvcpu!:any;
    icvram!:any;
    invcpu!:any;
    invram!:any;
    sfps!:any;
    sfpspare!:any;
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