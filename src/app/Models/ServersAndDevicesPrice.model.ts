export class ServersAndDevicesPrice{
    id!:any;
    euroPrice!:any;
    usdPrice!:any;
    annee!:any;
    name!:any;
    type!:ServerType;


}
export enum ServerType {
    Server='SERVER',
    Device='DEVICE'
}