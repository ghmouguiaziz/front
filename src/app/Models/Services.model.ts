export class ServicesPrice{
    id!:any;
    name!:any;
    provider!:any;
    price!:any;
    
    serviceType!:Services;


}
export enum Services {
    Upgrade='UPGRADE',
    Build='BUILD',
    Run='RUN'
}