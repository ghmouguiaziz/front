export class User { 
    id!:any;
    userName!:any;
    email!:any;
    password!:any;
    phoneNumber!:any;
    typeUser!:TypeUser;
    
  }
  export enum TypeUser {
    Admin='admin',
    Gestionnaire='gestionnaire',
    Consultant='consultant'
}