import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/Models/user.model';
import { UserService } from 'app/user.service';


enum userType{
  admin,user
}
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
user=new User();
  nuser=new User();
  
  token:any=localStorage.getItem("token");
  confirmPassword:any;
  errorMessage: string | null = null;
  

  constructor(private router: Router ) { }

  //login() {
    
    //this.router.navigate(['/Zone']);
  //}
  ngOnInit(){
    
  }
  login(){
    
    

this.router.navigate(['/Zone']);

/*
    this.UserService.authenticate(this.user).subscribe(res => {
      this.token=res ;
      console.log(this.token)
      if (this.token){
        localStorage.setItem("token",this.token);
        localStorage.setItem("email",this.user.email);
      
        
            
      }else {
        this.errorMessage = 'Authentication failed.';
        console.error('Authentication failed');
      }

    },
    (error) => {
      this.errorMessage = 'Authentication failed. Please check your credentials and try again.';
      console.error('Authentication failed:', error);
    }
  );
    
    
  }
  register(){
    if(this.confirmPassword==this.nuser.password){
    this.UserService.register(this.nuser).subscribe()
    
    window.location.reload()
  }

    console.log(this.nuser)*/
  

  }
}
