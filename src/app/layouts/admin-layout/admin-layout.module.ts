import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { CurrentResourcesComponent } from '../../CurrentResources/CurrentResources.component';
import { CurrentAppsComponent } from 'app/CurrentApps/CurrentApps.component'; 
import { LicensesPriceComponent } from 'app/LicensesPrice/LicensesPrice.component';
import { HardwarePriceComponent } from '../../HardwarePrice/HardwarePrice.component';
import { CapacitiesComponent } from '../../Capacities/Capacities.component';
import { RequiredResourcesComponent } from 'app/RequiredResources/RequiredResources.component';
import { PurshasesHistoryComponent } from '../../PurshasesHistory/PurshasesHistory.component';
import { BudgetComponent } from '../../Budget/Budget.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {ServicesPriceComponent} from 'app/services-price/services-price.component';
import { RoadMapComponent } from 'app/road-map/road-map.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [
    CurrentResourcesComponent,
    CurrentAppsComponent,
    LicensesPriceComponent,
    HardwarePriceComponent,
    CapacitiesComponent,
    RequiredResourcesComponent,
    PurshasesHistoryComponent,
    BudgetComponent,
    ServicesPriceComponent,
    RoadMapComponent,
  ]
})

export class AdminLayoutModule {}
