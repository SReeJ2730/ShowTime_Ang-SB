import { Component, OnInit } from '@angular/core';
import { Locations } from '../../models/locations.model';
import { LocationsService } from '../../services/locations.service';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';
import { DashboardComponent } from '../dashboard.component';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css']
})
export class SlotsComponent implements OnInit {

  locations$: Locations[] = [];
  vehicles$: Vehicle[] = [];
  sessionValue : string = "";
  slotService: any;

  constructor(
    private locationsService: LocationsService,
    private vehicleService: VehicleService,
    private dashboardComponent: DashboardComponent) { }

  ngOnInit() {
    this.dashboardComponent.checkLogin();
    this.loadLocations();
    this.loadVehicle();
  }


  loadLocations(){
    return this.locationsService.getLocations()
    .subscribe(data => this.locations$ = data)
  }

  loadVehicle(){
    return this.vehicleService.getVehicles()
    .subscribe(data => this.vehicles$ = data)
  }
}
