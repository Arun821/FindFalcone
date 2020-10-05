import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from "@angular/forms";

import { HomeComponent } from './home.component';
import { Destination } from '../model/destination';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("shoud emit a new selected destination", () =>{
    spyOn(component.selectedDestination, "emit").and.callThrough();
    const selectedDest = new Destination(1, "saturn", "falcon heavy");
    component.emitSelectedDestination(selectedDest);

    expect(component.selectedDestination.emit).toHaveBeenCalledWith(
      selectedDest
    );
  });
});
