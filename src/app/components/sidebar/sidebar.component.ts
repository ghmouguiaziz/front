import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/CurrentResources', title: 'Existing capacity',  icon: '', class: '' },
    { path: '/CurrentApps', title: 'Workload Of Applications',  icon:'', class: '' },
    { path: '/RoadMap', title: 'New Applications to be hosted',  icon:'', class: '' },
    { path: '/RequiredResources', title: 'Required Resources',  icon:'', class: '' },
    { path: '/Budget', title: 'OPC Budget',  icon:'', class: '' },
    { path: '/Capacities', title: 'Hardware Configuration',  icon:'', class: '' },
    { path: '/HardwarePrice', title: 'Hardware Price',  icon:'', class: '' },
    { path: '/LicensesPrice', title: 'Licenses Price',  icon:'', class: '' },
    {path: '/ServicesPrice', title: 'Services Price', icon:'', class:''},
    { path: '/PurshasesHistory', title: 'Purshases History',  icon:'', class: '' },
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
