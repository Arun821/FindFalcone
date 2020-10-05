import { inject, TestBed } from '@angular/core/testing';

import { FindingService } from './finding.service';
import { FindFalcone } from '../model/find';

describe('FindingService', () => {
  let service: FindingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should manage state for timeTaken", inject(
    [FindingService],
    (service: FindingService) => {
      service.setTime(123);
      const timeTaken: Number = service.getTime();
      expect(timeTaken).toBe(123);
    }
  ));

  it("should manage state for Find Falcone Request", inject(
    [FindingService],
    (service: FindingService) => {
      const request: FindFalcone = new FindFalcone();
      let planet_names = new Array<String>();
      let vehicle_names =new Array<String>();
      planet_names.push("mars");
      planet_names.push("pluto");

      vehicle_names.push("saturn v");
      vehicle_names.push("falcon heavy");
      vehicle_names.push("space shuttle");

      request.token = "test token";
      request.planet_names = [...planet_names];
      request.vehicle_names = [...vehicle_names];

      service.setFindReq(request);

      const testReq: FindFalcone = service.getFalcone();

      expect(testReq.token).toBe("test token");
      expect(testReq.planet_names.length).toBe(2);
      expect(testReq.vehicle_names.length).toBe(3);
    }
  ));
});
