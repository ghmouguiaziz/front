import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  role:any;

  constructor(private http : HttpClient) { }

  register(u:any){
    return this.http.post('http://localhost:8091/auth/register', u) ;
  }
  authenticate(u:any){
    return this.http.post('http://localhost:8091/auth/authenticate', u) ;
  }
  findUser(email:any){
    return this.http.get('http://localhost:8091/user/findUser/'+email)
  }

  verifConsultant(){
    
    var email = localStorage.getItem("email")
    this.findUser(email).subscribe(res => {
      this.role=res ;
      return this.role=="consultant"
    }
  );
    
    }
}
