import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitiesComponent } from './Capacities.component';

describe('IconsComponent', () => {
  let component: CapacitiesComponent;
  let fixture: ComponentFixture<CapacitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
