import { Routes } from '@angular/router';

import { CurrentResourcesComponent } from '../../CurrentResources/CurrentResources.component';
import { CurrentAppsComponent } from '../../CurrentApps/CurrentApps.component';
import { LicensesPriceComponent } from '../../LicensesPrice/LicensesPrice.component';
import { HardwarePriceComponent } from '../../HardwarePrice/HardwarePrice.component';
import { CapacitiesComponent } from '../../Capacities/Capacities.component';
import { RequiredResourcesComponent } from 'app/RequiredResources/RequiredResources.component';  
import { PurshasesHistoryComponent } from '../../PurshasesHistory/PurshasesHistory.component';
import { BudgetComponent } from 'app/Budget/Budget.component';
import { ServicesPriceComponent } from 'app/services-price/services-price.component';
import { RoadMapComponent } from 'app/road-map/road-map.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'CurrentResources',component: CurrentResourcesComponent },
    { path: 'CurrentApps',    component: CurrentAppsComponent },
    { path: 'LicensesPrice',      component: LicensesPriceComponent },
    { path: 'HardwarePrice',      component: HardwarePriceComponent },
    { path: 'Capacities',           component: CapacitiesComponent },
    { path: 'RequiredResources', component: RequiredResourcesComponent },
    { path: 'PurshasesHistory',   component: PurshasesHistoryComponent },
    { path: 'Budget',         component: BudgetComponent },
    {path: 'ServicesPrice',    component: ServicesPriceComponent},
    {path: 'RoadMap',    component: RoadMapComponent},
    
];
