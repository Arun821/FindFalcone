import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ServiceService } from '../service/service.service';
import { FindingService } from '../service/finding.service';

import { Ivehicles } from '../model/vehicle';
import { Iplanets } from '../model/planets';
import { Destination } from '../model/destination';
import { FindFalcone } from '../model/find';

@Component({
  selector: 'app-finding',
  templateUrl: './finding.component.html',
  styleUrls: ['./finding.component.css']
})
export class FindingComponent implements OnInit {

  token: any;
  planets: Iplanets[];
  availablePlanets: Iplanets[];
  selectedDestinations: Destination[] =[];
  vehicles: Ivehicles[];
  timeTaken = 0;

  constructor(private service:ServiceService, private finding:FindingService, private router:Router) { }

  ngOnInit(): void {
    this.getPlanets();
    this.getVehicle();
    this.getToken();
  }

  getPlanets(): void{
    this.service.getPlanets().subscribe(planets => {
      this.planets = [...planets];
      this.availablePlanets = [...planets];
    })
  }

  getVehicle(): void{
    this.service.getVehicle().subscribe(vehicles => {
      this.vehicles = vehicles;
    })
  }

  getToken(): void{
    this.service.getTocken().subscribe(token => {
      this.token = token.token;
    })
  }

  selectedDestination(selectedDestination: Destination): void{
    this.maintainSelectedDestinations(selectedDestination);
    this.maintainAvailablePlanets(selectedDestination);
    this.maintainVehicles(selectedDestination);
    this.timeTaken = this.calculateTime();
  }

  private maintainSelectedDestinations(selectedDestination: Destination): void {
    if (
      this.selectedDestinations.find(
        sel => sel.destination_no == selectedDestination.destination_no
      )
    ) {
      // delete the selectedDestination if it is already in the list
      this.selectedDestinations = this.selectedDestinations.filter(
        sel => sel.destination_no !== selectedDestination.destination_no
      );
      console.log(this.selectedDestination);
      
    }
    // add
    this.selectedDestinations = [
      ...this.selectedDestinations,
      selectedDestination
    ];
    console.log(`this.selectedDestinations = `, this.selectedDestinations);
  }

  private maintainAvailablePlanets(selectedDestination: Destination): void {
    // If a planet has been selected, remove it from the list if available planets
    this.availablePlanets = this.availablePlanets.filter(
      planet => planet.name !== selectedDestination.planetName
    );
  }

  private maintainVehicles(selectedDestination: Destination): void {
    // If a vehicle has been selected, reduce it's available count
    const vehicleName: String = selectedDestination.vehicleName;
    for (let vehicle of this.vehicles) {
      if (vehicle.name === vehicleName && vehicle.total_no > 0) {
        vehicle.total_no--;
      }
    }
  }

  private calculateTime(): number {
    let timeTaken: number = 0;

    for (let destination of this.selectedDestinations) {
      let planet = this.planets.find(pl => pl.name === destination.planetName);
      let vehicle = this.vehicles.find(
        ve => ve.name === destination.vehicleName
      );
      timeTaken += planet.distance / vehicle.speed;
      console.log(timeTaken);
    }
    
    return timeTaken;
  }

  find(): void {
    let request: FindFalcone = new FindFalcone();
    let planet_names = new Array<String>();
    let vehicle_names = new Array<String>();

    for (let destination of this.selectedDestinations) {
      planet_names.push(destination.planetName);
      vehicle_names.push(destination.vehicleName);
    }

    request.token = this.token;
    request.planet_names = [...planet_names];
    request.vehicle_names = [...vehicle_names];

    this.finding.setFindReq(request);
    this.finding.setTime(this.calculateTime());

    this.router.navigate(["/result"]);
  }

}
