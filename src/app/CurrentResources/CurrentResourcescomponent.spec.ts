import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentResourcesComponent } from './CurrentResources.component';

describe('CurrentResourcesComponent', () => {
  let component: CurrentResourcesComponent;
  let fixture: ComponentFixture<CurrentResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
