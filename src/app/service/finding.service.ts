import { Injectable } from '@angular/core';

import { FindFalcone } from '../model/find';

@Injectable({
  providedIn: 'root'
})
export class FindingService {
  private findFalcone: FindFalcone;
  private timeTaken: Number;

  constructor() { }

  setFindReq(findFalconeReq: FindFalcone): void {
    this.findFalcone = findFalconeReq;
  }
  getFalcone(): FindFalcone{
    return this.findFalcone;
  }
  setTime(timeTaken:Number): void {
    this.timeTaken = timeTaken;
  }
  getTime(): Number {
    return this.timeTaken;
  }
}
