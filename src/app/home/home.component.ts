import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";

import { Ivehicles } from '../model/vehicle';
import { Iplanets } from '../model/planets';
import { Destination } from '../model/destination';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input()
  destination_no : number;

  @Input()
  planet : Iplanets[];
  
  @Input()
  vehicle : Ivehicles[];

  @Output()
  selectedDestination = new EventEmitter<Destination>();

  startFrom : FormGroup;
  selectedPlanetName: string;
  displaySelectedVehicleErrorMessage: boolean = false;

  
  constructor(private formBuilder: FormBuilder ) { }

  ngOnInit(): void {

    this.startFrom = this.formBuilder.group({
      planet : [""],
      vehicle : [""],
      selectedPlanetName: [""]
    });
  }

  processDestination(): void {
    if (!this.validateVehicle()) {
      return;
    }

    const selectedDest = new Destination(
      this.destination_no,
      this.startFrom.value.planet,
      this.startFrom.value.vehicle
    );
    this.selectedPlanetName = this.startFrom.value.planet;
    this.startFrom.patchValue({
      selectedPlanetName: this.selectedPlanetName
    });
    this.emitSelectedDestination(selectedDest);
  }

  emitSelectedDestination(selectedDest: Destination): void {
    this.selectedDestination.emit(selectedDest);
  }

  validateVehicle(): boolean {
    this.displaySelectedVehicleErrorMessage = false;

    const selectedVehicleName = this.startFrom.value.vehicle;
    const selectedVehicle: Ivehicles = this.vehicle.find(
      vhi => vhi.name === selectedVehicleName
    );

    if (selectedVehicle.total_no === 0) {
      this.displaySelectedVehicleErrorMessage = true;
      return false;
    }

    return true;
  }
}
