import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ZoneComponent } from './zone/zone.component';

const routes: Routes =[
    /*{ path: 'login', component: LoginComponent },*/
    { path: 'Zone', component: ZoneComponent },
    { path: '', redirectTo: 'Zone', pathMatch: 'full' },
    
   {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
