import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredResourcesComponent } from './RequiredResources.component';

describe('RequiredResourcesComponent', () => {
  let component: RequiredResourcesComponent;
  let fixture: ComponentFixture<RequiredResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequiredResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
