import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FindingService } from '../service/finding.service';
import { ServiceService } from '../service/service.service';
import { FindFalcone } from '../model/find';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  responsePlanet : string;
  timeTaken : Number;
  responseStatus : string;
  responseErr : string;
  constructor(private finding:FindingService, private service: ServiceService, private router:Router) { }

  ngOnInit(): void {
    this.findFalcone();
    this.timeTaken = this.finding.getTime();
  }

  findFalcone(): void {
    const request: FindFalcone = this.finding.getFalcone();
    this.service.findFalcone(request).subscribe(response => {
      this.responseStatus = response.status ? response.status: "";
      this.responsePlanet = response.planet_name ? response.planet_name:"";
      this.responseErr = response.error ? response.error: "";
      console.log(this.responseStatus=='success');
      // console.log(this.responseStatus=='false');
      console.log(this.responsePlanet);
      console.log(this.responseErr);
    });
    
  }

  home(): void{
    this.router.navigate(['']);
  }
}
