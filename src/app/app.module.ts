import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { ZoneComponent } from './zone/zone.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular"
import { LocationStrategy , PathLocationStrategy } from '@angular/common';
import { ToastComponent } from './toast/toast.component';


export  function kcFactory(kcService : KeycloakService): () =>Promise<any>{
  return (): Promise<any> => 
  
    
     kcService.init({
      config : {
        realm : "MTCsecurity",
        clientId : "MTC",
        url : "http://172.18.131.140:8080",
        
        

      },
      initOptions : {
        onLoad: "login-required",
        checkLoginIframe: true

      },
      
    })
  }
  

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatInputModule,
    KeycloakAngularModule
    

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ZoneComponent,
    ToastComponent,
    
    

  ],
  providers: [
    {provide : APP_INITIALIZER,
    deps: [KeycloakService],
    useFactory: kcFactory,
    multi: true },/*{ provide: LocationStrategy, useClass: PathLocationStrategy }*/
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
